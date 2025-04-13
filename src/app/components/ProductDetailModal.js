'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import styles from '@/app/styles/Products.module.css';

export default function ProductDetailModal({
                                               product,
                                               onClose,
                                               onAddToCart,
                                               quantity = 1,
                                               setQuantity = () => {}
                                           }) {
    // Bloquear scroll cuando el modal está abierto
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => document.body.style.overflow = 'unset';
    }, []);

    const handleQuantityChange = (newQuantity) => {
        if (newQuantity >= 1 && newQuantity <= 10) {
            setQuantity(newQuantity);
        }
    };

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <button className={styles.closeButton} onClick={onClose}>
                    <i className='bx bx-x'></i>
                </button>

                <div className={styles.modalGrid}>
                    {/* Columna de imagen */}
                    <div className={styles.modalImageContainer}>
                        <Image
                            src={product.image || '/images/default-product.jpg'}
                            alt={product.name || 'Producto sin nombre'}
                            width={500}
                            height={500}
                            className={styles.modalImage}
                            priority
                        />
                    </div>

                    {/* Columna de información */}
                    <div className={styles.modalInfo}>
                        <h2>{product.name || 'Producto'}</h2>
                        <p className={styles.modalPrice}>${product.price ? (product.price * quantity).toFixed(2) : '0.00'}</p>

                        <div className={styles.modalDescription}>
                            <p>{product.description || 'Descripción no disponible'}</p>

                            {product.details && (
                                <ul className={styles.detailsList}>
                                    {product.details.map((detail, index) => (
                                        <li key={index}>{detail}</li>
                                    ))}
                                </ul>
                            )}
                        </div>

                        {/* Selector de color */}
                        {product.colors && product.colors.length > 0 && (
                            <div className={styles.colorSelector}>
                                <h4>Colores disponibles:</h4>
                                <div className={styles.colorOptions}>
                                    {product.colors.map((color, index) => (
                                        <button
                                            key={index}
                                            style={{ backgroundColor: color }}
                                            aria-label={`Color ${index + 1}`}
                                            className={styles.colorOption}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Selector de cantidad */}
                        <div className={styles.quantitySelector}>
                            <h4>Cantidad:</h4>
                            <div className={styles.quantityControls}>
                                <button
                                    onClick={() => handleQuantityChange(quantity - 1)}
                                    disabled={quantity <= 1}
                                >
                                    -
                                </button>
                                <span>{quantity}</span>
                                <button
                                    onClick={() => handleQuantityChange(quantity + 1)}
                                    disabled={quantity >= 10}
                                >
                                    +
                                </button>
                            </div>
                        </div>

                        {/* Botones de acción */}
                        <div className={styles.modalActions}>
                            <button
                                className={styles.addToCartButton}
                                onClick={() => onAddToCart(product)}
                            >
                                Añadir al carrito (${(product.price * quantity).toFixed(2)})
                            </button>
                            <button
                                className={styles.continueShopping}
                                onClick={onClose}
                            >
                                Seguir viendo
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}