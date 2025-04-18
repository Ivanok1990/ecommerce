'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { toast } from 'react-toastify'; // For user feedback
import styles from '@/app/styles/Products.module.css';

const ProductDetailModal = ({ product, onClose, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  if (!product) return null;

  const {
    name,
    price,
    image,
    description,
    details = [],
    colors = [],
    stock,
  } = product;

  const isOutOfStock = stock <= 0;
  const totalPrice = (price * quantity).toFixed(2);

  const handleQuantityChange = (newQuantity) => {
    // Use product.stock if available, otherwise default to 10
    const maxQuantity = typeof stock !== 'undefined' ? stock : 10;
    const clampedQuantity = Math.min(Math.max(newQuantity, 1), maxQuantity);
    setQuantity(clampedQuantity);
  };

  const handleAddToCart = () => {
    // Validate product data
    if (!product?.id || !product?.name || !product?.price || typeof stock === 'undefined') {
      console.error('Invalid product data in modal:', product);
      toast.error('Error: Producto inválido');
      return;
    }

    // Check stock availability
    if (quantity > stock) {
      toast.error(`Solo hay ${stock} unidades disponibles`);
      return;
    }

    // Call onAddToCart (which uses addToCart from CartContext in ProductGrid)
    try {
      onAddToCart(product, quantity);
      toast.success(`Añadiste ${quantity} ${name} al carrito`);
      console.log(`Added ${quantity} of ${name} to cart (ID: ${product.id})`);
      setQuantity(1); // Reset quantity after adding
    } catch (error) {
      console.error('Error adding to cart from modal:', error);
      toast.error('Error al añadir al carrito');
    }
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Cerrar modal"
        >
          &times;
        </button>

        <div className={styles.modalGrid}>
          <div className={styles.modalImageContainer}>
            <Image
              src={image || '/images/default-product.jpg'}
              alt={name}
              width={500}
              height={500}
              className={styles.modalImage}
              priority
            />
            {isOutOfStock && <span className={styles.outOfStockOverlay}>Agotado</span>}
          </div>

          <div className={styles.modalInfo}>
            <h2>{name}</h2>
            <p className={styles.modalPrice}>${totalPrice}</p>

            <div className={styles.modalDescription}>
              <p>{description || 'Descripción no disponible'}</p>
              {details.length > 0 && (
                <ul className={styles.detailsList}>
                  {details.map((detail, index) => (
                    <li key={index}>{detail}</li>
                  ))}
                </ul>
              )}
            </div>

            {colors.length > 0 && (
              <div className={styles.colorSelector}>
                <h4>Colores:</h4>
                <div className={styles.colorOptions}>
                  {colors.map((color, index) => (
                    <button
                      key={index}
                      className={styles.colorButton}
                      style={{ backgroundColor: color }}
                      aria-label={`Color ${color}`}
                      title={`Color ${index + 1}`}
                      disabled // Colors are for display only in this implementation
                    />
                  ))}
                </div>
              </div>
            )}

            <div className={styles.quantitySelector}>
              <h4>Cantidad:</h4>
              <div className={styles.quantityControls}>
                <button
                  onClick={() => handleQuantityChange(quantity - 1)}
                  disabled={quantity <= 1}
                  className={styles.quantityButton}
                  aria-label={`Reducir cantidad de ${name}`}
                >
                  -
                </button>
                <span className={styles.quantityDisplay}>{quantity}</span>
                <button
                  onClick={() => handleQuantityChange(quantity + 1)}
                  disabled={quantity >= (stock || 10)}
                  className={styles.quantityButton}
                  aria-label={`Aumentar cantidad de ${name}`}
                >
                  +
                </button>
              </div>
            </div>

            <div className={styles.modalActions}>
              <button
                onClick={handleAddToCart}
                disabled={isOutOfStock}
                className={`${styles.addToCartButton} ${isOutOfStock ? styles.disabledButton : ''}`}
                aria-label={isOutOfStock ? 'Producto agotado' : `Añadir ${name} al carrito`}
              >
                {isOutOfStock ? 'Agotado' : `Añadir ($${totalPrice})`}
              </button>
              <button
                onClick={onClose}
                className={styles.continueShopping}
                aria-label="Continuar comprando"
              >
                Seguir comprando
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailModal;
