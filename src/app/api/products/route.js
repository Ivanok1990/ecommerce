// src/app/api/products/route.js
import { connectDB, query } from '@/app/lib/db';
import { z } from 'zod';

const searchParamsSchema = z.object({
    q: z.string().trim().max(100).optional(),
    category: z.string().trim().optional().default('todos'),
    color: z.string().trim().optional(),
    minPrice: z.number().min(0).max(1000).optional().default(0),
    maxPrice: z.number().min(0).max(1000).optional().default(100),
    page: z.number().int().min(1).optional().default(1),
    limit: z.number().int().min(1).max(100).optional().default(20),
    sortBy: z.enum(['price', 'name', 'created_at']).optional().default('created_at'),
    sortOrder: z.enum(['asc', 'desc']).optional().default('desc'),
}).refine((data) => data.minPrice <= data.maxPrice, {
    message: 'El precio mínimo debe ser menor o igual al máximo',
});

export async function GET(request) {
    try {
        await connectDB();
        const { searchParams } = new URL(request.url);

        const params = {
            q: searchParams.get('q') || '',
            category: searchParams.get('category') || 'todos',
            color: searchParams.get('color') || '',
            minPrice: parseFloat(searchParams.get('minPrice')) || 0,
            maxPrice: parseFloat(searchParams.get('maxPrice')) || 100,
            page: parseInt(searchParams.get('page')) || 1,
            limit: parseInt(searchParams.get('limit')) || 20,
            sortBy: searchParams.get('sortBy') || 'created_at',
            sortOrder: searchParams.get('sortOrder') || 'desc',
        };

        const validatedParams = searchParamsSchema.parse(params);

        // Build WHERE clause
        let whereClauses = ['p.price BETWEEN ? AND ?'];
        let queryParams = [validatedParams.minPrice, validatedParams.maxPrice];

        if (validatedParams.q) {
            whereClauses.push('(p.name LIKE ? OR p.description LIKE ?)');
            queryParams.push(`%${validatedParams.q}%`, `%${validatedParams.q}%`);
        }

        if (validatedParams.category !== 'todos') {
            whereClauses.push('c.name = ?');
            queryParams.push(validatedParams.category);
        }

        if (validatedParams.color) {
            whereClauses.push('pc.color = ?');
            queryParams.push(validatedParams.color);
        }

        const whereClause = whereClauses.length > 0 ? `WHERE ${whereClauses.join(' AND ')}` : '';

        // Build SQL query
        const sql = `
      SELECT DISTINCT p.id, p.name, p.description, p.price, p.image, p.stock, 
             c.name AS category,
             GROUP_CONCAT(DISTINCT pc.color) AS colors,
             GROUP_CONCAT(DISTINCT pd.detail) AS details
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      LEFT JOIN product_colors pc ON p.id = pc.product_id
      LEFT JOIN product_details pd ON p.id = pd.product_id
      ${whereClause}
      GROUP BY p.id
      ORDER BY p.${validatedParams.sortBy} ${validatedParams.sortOrder.toUpperCase()}
      LIMIT ? OFFSET ?;
    `;

        const countSql = `
      SELECT COUNT(DISTINCT p.id) as total
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      LEFT JOIN product_colors pc ON p.id = pc.product_id
      LEFT JOIN product_details pd ON p.id = pd.product_id
      ${whereClause};
    `;

        queryParams.push(validatedParams.limit, (validatedParams.page - 1) * validatedParams.limit);

        // Execute queries
        const products = await query(sql, queryParams);
        const [{ total }] = await query(countSql, queryParams.slice(0, -2));

        // Format results
        const formattedProducts = products.map((product) => ({
            id: product.id,
            name: product.name || 'Unnamed Product',
            description: product.description || '',
            price: parseFloat(product.price) || 0,
            image: product.image || '/images/default-product.jpg',
            stock: product.stock || 0,
            colors: product.colors ? product.colors.split(',') : [],
            details: product.details ? product.details.split(',') : [],
            category: product.category || 'Sin categoría',
        }));

        return new Response(
            JSON.stringify({
                success: true,
                data: formattedProducts,
                pagination: {
                    total,
                    totalPages: Math.ceil(total / validatedParams.limit),
                    currentPage: validatedParams.page,
                    perPage: validatedParams.limit,
                },
            }),
            {
                status: 200,
                headers: { 'Content-Type': 'application/json' },
            }
        );
    } catch (error) {
        console.error('Error en /api/products:', {
            message: error.message,
            stack: error.stack,
            params: request.url,
        });
        return new Response(
            JSON.stringify({
                success: false,
                error:
                    error instanceof z.ZodError
                        ? 'Parámetros inválidos'
                        : 'Error del servidor',
                details: error.message,
            }),
            {
                status: error instanceof z.ZodError ? 400 : 500,
                headers: { 'Content-Type': 'application/json' },
            }
        );
    }
}