// src/app/components/ProductGrid.js
'use client';

import { useState, Suspense } from 'react';
import Image from 'next/image';
import ProductDetailModal from './ProductDetailModal';
import styles from '@/app/styles/Products.module.css';
import { useCart } from '@/app/context/CartContext';

function ProductGridContent({ products }) {
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const { addToCart } = useCart();

    const handleProductClick = (product, e) => {
        if (e.target.tagName !== 'BUTTON') {
            setSelectedProduct(product);
        }
    };

    const handleCloseModal = () => {
        setSelectedProduct(null);
        setQuantity(1);
    };

    const handleAddToCart = (product) => {
        addToCart(product, quantity);
        setSelectedProduct(null);
        setQuantity(1);
    };

    return (
        <>
            {products.length === 0 ? (
                <div className={styles.noResults}>
                    No se encontraron productos con esos filtros.
                </div>
            ) : (
                <div className={styles.productGrid}>
                    {products.map((product) => (
                        <div
                            key={product.id}
                            className={styles.productCard}
                            onClick={(e) => handleProductClick(product, e)}
                        >
                            <div className={styles.imageContainer}>
                                <Image
                                    src={product.image || '/images/default-product.jpg'}
                                    alt={product.name || 'Producto sin nombre'}
                                    width={300}
                                    height={300}
                                    className={styles.productImage}
                                    priority
                                />
                                {product.stock < 5 && product.stock > 0 && (
                                    <span className={styles.lowStock}>¡Últimas unidades!</span>
                                )}
                                {product.stock === 0 && (
                                    <span className={styles.outOfStockBadge}>Agotado</span>
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
                            <button
                                className={styles.quickViewButton}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedProduct(product);
                                }}
                                disabled={product.stock === 0}
                            >
                                Vista rápida
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {selectedProduct && (
                <ProductDetailModal
                    product={selectedProduct}
                    onClose={handleCloseModal}
                    onAddToCart={handleAddToCart}
                    quantity={quantity}
                    setQuantity={setQuantity}
                />
            )}
        </>
    );
}

export default function ProductGrid({ products }) {
    return (
        <Suspense fallback={<div>Loading product grid...</div>}>
            <ProductGridContent products={products} />
        </Suspense>
    );
}