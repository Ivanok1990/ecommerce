// src/app/components/ProductList.js
'use client';

import Link from 'next/link';
import Image from 'next/image';
import styles from '@/app/styles/Products.module.css';

const ProductList = ({ products = [], limit }) => {
    const displayedProducts = limit ? products.slice(0, limit) : products;

    if (displayedProducts.length === 0) {
        return <div className={styles.noProducts}>No hay productos disponibles</div>;
    }

    return (
        <div className={styles.list}>
            {displayedProducts.map(product => (
                <article key={product.id} className={styles.listItem}>
                    <Link href={`/products/${product.id}`} className={styles.productLink}>
                        <div className={styles.imageContainer}>
                            <Image
                                src={product.image || '/images/default-product.jpg'}
                                alt={product.name}
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
                        <div className={styles.productInfo}>
                            <h3>{product.name}</h3>
                            <p className={styles.description}>
                                {product.description || 'Descripción no disponible'}
                            </p>
                            <div className={styles.priceInfo}>
                                <span className={styles.price}>
                                    ${product.price?.toFixed(2) || '0.00'}
                                </span>
                                <span className={product.stock > 0 ? styles.inStock : styles.outOfStock}>
                                    {product.stock > 0 ? 'Disponible' : 'Agotado'}
                                </span>
                            </div>
                        </div>
                    </Link>
                    <Link
                        href={`/products/${product.id}`}
                        className={styles.detailButton}
                    >
                        Ver detalles
                    </Link>
                </article>
            ))}
        </div>
    );
};

export default ProductList;