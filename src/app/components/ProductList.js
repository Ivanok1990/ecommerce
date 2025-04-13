'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from '@/app/styles/ProductList.module.css';

export default function ProductList({ limit }) {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('/api/products');
                const data = await response.json();
                setProducts(limit ? data.slice(0, limit) : data);
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [limit]);

    if (loading) return <div className={styles.loading}>Cargando productos...</div>;

    return (
        <div className={styles.productGrid}>
            {products.map(product => (
                <div key={product.id} className={styles.productCard}>
                    <Link href={`/products/${product.id}`}>
                        <div className={styles.imageContainer}>
                            <Image
                                src={product.image}
                                alt={product.name}
                                width={300}
                                height={300}
                                className={styles.productImage}
                            />
                            {product.stock < 5 && (
                                <span className={styles.lowStock}>¡Últimas unidades!</span>
                            )}
                        </div>
                        <h3>{product.name}</h3>
                        <p className={styles.productDescription}>{product.description}</p>
                        <div className={styles.priceContainer}>
                            <span className={styles.price}>${product.price.toFixed(2)}</span>
                            <span className={product.stock > 0 ? styles.inStock : styles.outOfStock}>
                {product.stock > 0 ? 'Disponible' : 'Agotado'}
              </span>
                        </div>
                    </Link>
                    <Link href={`/products/${product.id}`} className={styles.addToCart}>
                        Ver detalles
                    </Link>
                </div>
            ))}
        </div>
    );
}