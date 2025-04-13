// src/app/api/products/[id]/route.js
import { connectDB } from '@/app/lib/db';
import Product from '@/app/models/Product';
import ProductColor from '@/app/models/ProductColor';
import ProductDetail from '@/app/models/ProductDetail';
import Category from '@/app/models/Category';

export async function GET(request, { params }) {
    const { id } = params;

    if (!id || isNaN(parseInt(id))) {
        return new Response(JSON.stringify({ error: 'ID de producto inválido' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    try {
        await connectDB();

        const product = await Product.findByPk(id, {
            include: [
                { model: ProductColor, as: 'ProductColors' },
                { model: ProductDetail, as: 'ProductDetails' },
                { model: Category, as: 'Category' },
            ],
        });

        if (!product) {
            return new Response(JSON.stringify({ error: 'Producto no encontrado' }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const formattedProduct = {
            id: product.id,
            name: product.name || 'Unnamed Product',
            description: product.description || '',
            price: parseFloat(product.price) || 0,
            image: product.image || '/images/default-product.jpg',
            stock: product.stock || 0,
            colors: product.ProductColors.map((c) => c.color),
            category: product.Category?.name || 'Sin categoría',
            details: product.ProductDetails.map((d) => d.detail),
        };

        return new Response(JSON.stringify(formattedProduct), {
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error(`Error al obtener el producto con ID ${id}:`, error);
        return new Response(
            JSON.stringify({ error: 'Error interno al obtener el producto' }),
            {
                status: 500,
                headers: { 'Content-Type': 'application/json' },
            }
        );
    }
}