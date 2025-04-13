// src/app/components/ProductCard.js
'use client';

import { useCart } from '@/app/context/CartContext';
import styles from '@/app/styles/Products.module.css';

export default function ProductCard({ product }) {
    const { addToCart } = useCart();

    const productName = product?.name || 'Producto sin nombre';
    const productPrice = product?.price ? Number(product.price).toFixed(2) : '0.00';

    if (!product) {
        return <div className={styles.card}>Producto no disponible</div>;
    }

    return (
        <div className={styles.card}>
            <h3>{productName}</h3>
            <p>${productPrice}</p>
            <button
                onClick={() => addToCart(product, 1)}
                className={styles.addButton}
                disabled={!product.id}
            >
                Add to Cart
            </button>
        </div>
    );
}