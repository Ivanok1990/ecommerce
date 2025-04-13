// src/app/components/ProductCard.js
'use client';

import { useCart } from '@/app/context/CartContext';
import styles from '@/app/styles/Products.module.css';

export default function ProductCard({ product }) {
    const { addToCart } = useCart();

    return (
        <div className={styles.card}>
            <h3>{product.name}</h3>
            <p>${product.price.toFixed(2)}</p>
            <button
                onClick={() => addToCart(product, 1)}
                className={styles.addButton}
            >
                Add to Cart
            </button>
        </div>
    );
}