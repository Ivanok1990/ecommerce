// app/api/products/route.js
import mysql from 'mysql';
import { z } from 'zod';

// Configuración de la conexión
const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'lipstore',
    connectionLimit: 10,
    waitForConnections: true,
    queueLimit: 0
});

// Promisify para usar async/await
const query = (sql, values) => {
    return new Promise((resolve, reject) => {
        pool.query(sql, values, (error, results) => {
            if (error) return reject(error);
            resolve(results);
        });
    });
};

// Esquema de validación
const searchParamsSchema = z.object({
    q: z.string().trim().max(100).optional(),
    category: z.string().trim().optional().default('todos'),
    color: z.string().trim().optional(),
    minPrice: z.number().min(0).max(1000).optional().default(0),
    maxPrice: z.number().min(0).max(1000).optional().default(100),
    page: z.number().int().min(1).optional().default(1),
    limit: z.number().int().min(1).max(100).optional().default(20),
    sortBy: z.enum(['price', 'name', 'created_at']).optional().default('created_at'),
    sortOrder: z.enum(['asc', 'desc']).optional().default('desc')
}).refine(data => data.minPrice <= data.maxPrice, {
    message: 'El precio mínimo debe ser menor o igual al máximo'
});

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);

        // Parsear y validar parámetros
        const params = {
            q: searchParams.get('q') || '',
            category: searchParams.get('category') || 'todos',
            color: searchParams.get('color') || '',
            minPrice: parseFloat(searchParams.get('minPrice')) || 0,
            maxPrice: parseFloat(searchParams.get('maxPrice')) || 100,
            page: parseInt(searchParams.get('page')) || 1,
            limit: parseInt(searchParams.get('limit')) || 20,
            sortBy: searchParams.get('sortBy') || 'created_at',
            sortOrder: searchParams.get('sortOrder') || 'desc'
        };

        const validatedParams = searchParamsSchema.parse(params);

        // Construir consulta base
        let sqlQuery = `
      SELECT 
        p.*,
        c.name AS category_name,
        GROUP_CONCAT(DISTINCT pc.color) AS colors,
        GROUP_CONCAT(DISTINCT pd.detail) AS details
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      LEFT JOIN product_colors pc ON p.id = pc.product_id
      LEFT JOIN product_details pd ON p.id = pd.product_id
      WHERE p.price BETWEEN ? AND ?
    `;

        const queryParams = [
            validatedParams.minPrice,
            validatedParams.maxPrice
        ];

        // Añadir filtros
        if (validatedParams.q) {
            sqlQuery += ` AND (p.name LIKE ? OR p.description LIKE ?)`;
            queryParams.push(`%${validatedParams.q}%`, `%${validatedParams.q}%`);
        }

        if (validatedParams.category !== 'todos') {
            sqlQuery += ` AND c.name = ?`;
            queryParams.push(validatedParams.category);
        }

        if (validatedParams.color) {
            sqlQuery += ` AND pc.color = ?`;
            queryParams.push(validatedParams.color);
        }

        // Agrupar y ordenar
        sqlQuery += `
      GROUP BY p.id
      ORDER BY ${validatedParams.sortBy} ${validatedParams.sortOrder}
      LIMIT ? OFFSET ?
    `;

        queryParams.push(
            validatedParams.limit,
            (validatedParams.page - 1) * validatedParams.limit
        );

        // Ejecutar consulta
        const products = await query(sqlQuery, queryParams);

        // Obtener conteo total
        const [countResult] = await query('SELECT COUNT(*) as total FROM products');
        const total = countResult.total;

        // Formatear respuesta
        const formattedProducts = products.map(product => ({
            id: product.id,
            name: product.name,
            description: product.description,
            price: parseFloat(product.price),
            image: product.image,
            stock: product.stock,
            colors: product.colors ? product.colors.split(',') : [],
            details: product.details ? product.details.split(',') : [],
            category: product.category_name || 'Sin categoría'
        }));

        return new Response(JSON.stringify({
            success: true,
            data: formattedProducts,
            pagination: {
                total,
                totalPages: Math.ceil(total / validatedParams.limit),
                currentPage: validatedParams.page,
                perPage: validatedParams.limit
            }
        }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });

    } catch (error) {
        console.error('Error en /api/products:', error);

        return new Response(JSON.stringify({
            success: false,
            error: error instanceof z.ZodError ? 'Parámetros inválidos' : 'Error del servidor',
            details: error.message
        }), {
            status: error instanceof z.ZodError ? 400 : 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}