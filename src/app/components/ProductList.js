// src/app/components/ProductList.js
'use client';

import Image from 'next/image';
import Link from 'next/link';
import styles from '@/app/styles/ProductList.module.css';

export default function ProductList({ products = [], limit }) {
    const displayedProducts = limit ? products.slice(0, limit) : products;

    if (!displayedProducts.length) {
        return <div className={styles.noProducts}>No hay productos disponibles</div>;
    }

    return (
        <div className={styles.productGrid}>
            {displayedProducts.map((product) => (
                <div key={product.id} className={styles.productCard}>
                    <Link href={`/products/${product.id}`}>
                        <div className={styles.imageContainer}>
                            <Image
                                src={product.image || '/images/default-product.jpg'}
                                alt={product.name || 'Producto'}
                                width={300}
                                height={300}
                                className={styles.productImage}
                            />
                            {product.stock < 5 && product.stock > 0 && (
                                <span className={styles.lowStock}>¡Últimas unidades!</span>
                            )}
                            {product.stock === 0 && (
                                <span className={styles.outOfStock}>Agotado</span>
                            )}
                        </div>
                        <h3>{product.name || 'Producto'}</h3>
                        <p className={styles.productDescription}>
                            {product.description || 'Descripción no disponible'}
                        </p>
                        <div className={styles.priceContainer}>
              <span className={styles.price}>
                ${product.price ? product.price.toFixed(2) : '0.00'}
              </span>
                            <span
                                className={product.stock > 0 ? styles.inStock : styles.outOfStock}
                            >
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