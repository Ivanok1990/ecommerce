'use client';

import { useCart } from '@/app/context/CartContext';
import Image from 'next/image';
import styles from '@/app/styles/Products.module.css';
import listStyles from '@/app/styles/ProductList.module.css'; // Import ProductList.module.css for additional styles

export default function ProductCard({ product, onClick }) {
    const { addToCart } = useCart();

    if (!product?.id) {
        return <div className={styles.productCard}>Producto no disponible</div>;
    }

    const { name, price, image, stock } = product;
    const formattedPrice = price ? `$${price.toFixed(2)}` : '$0.00';
    const isOutOfStock = stock <= 0;

    return (
        <div className={styles.productCard} onClick={onClick} role="button" tabIndex={0} aria-label={`Ver detalles de ${name}`}>
            <div className={styles.imageContainer}>
                <Image
                    src={image || '/images/default-product.jpg'}
                    alt={name || 'Producto'}
                    width={280}
                    height={280}
                    className={styles.productImage}
                />
                {stock > 0 && stock < 5 && (
                    <span className={styles.lowStock}>¡Últimas unidades!</span>
                )}
                {isOutOfStock && (
                    <span className={styles.outOfStock}>Agotado</span>
                )}
            </div>

            <div className={listStyles.priceContainer}>
                <h3 className={listStyles.productName}>{name}</h3>
                <p className={styles.price}>{formattedPrice}</p>
                <p className={isOutOfStock ? styles.outOfStock : styles.inStock}>
                    {isOutOfStock ? 'Agotado' : 'Disponible'}
                </p>
            </div>

            <button
                onClick={(e) => {
                    e.stopPropagation(); // Prevent triggering onClick of parent
                    addToCart(product, 1);
                }}
                className={listStyles.addToCart}
                disabled={isOutOfStock}
                aria-label={`Añadir ${name} al carrito`}
            >
                Añadir al carrito
            </button>
        </div>
    );
}