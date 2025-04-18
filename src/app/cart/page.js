'use client';

import { useState, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/app/context/CartContext';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import styles from '@/app/styles/Cart.module.css';
import checkoutStyles from '@/app/styles/Checkout.module.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function CartPage() {
  return (
    <Suspense fallback={<div className={styles.loading}>Cargando carrito...</div>}>
      <CartContent />
    </Suspense>
  );
}

function CartContent() {
  const {
    cart,
    totalItems,
    totalPrice,
    updateQuantity,
    removeFromCart,
    clearCart,
    addToCart,
  } = useCart();
  const router = useRouter();
  const TAX_RATE = 0.15;
  const taxes = totalPrice * TAX_RATE;
  const finalTotal = totalPrice + taxes;

  const handleQuantityChange = (id, newQuantity, stock) => {
    if (newQuantity < 1) {
      toast.error('La cantidad mínima es 1');
      return;
    }
    if (newQuantity > stock) {
      toast.error('No hay suficiente stock disponible');
      return;
    }
    updateQuantity(id, newQuantity);
    toast.success('Cantidad actualizada');
  };

  const handleRemoveItem = (id, name) => {
    removeFromCart(id);
    toast.success(`${name} eliminado del carrito`);
  };

  const handleClearCart = () => {
    clearCart();
    toast.success('Carrito vaciado');
  };

  const handleCheckout = () => {
    // Pass cart details to checkout page via query parameters
    const params = new URLSearchParams();
    params.set('cart', JSON.stringify(cart));
    params.set('taxes', taxes.toFixed(2));
    params.set('total', finalTotal.toFixed(2));
    router.push(`/checkout?${params.toString()}`);
  };

  // Temporary test button to confirm addToCart works
  const handleAddTestProduct = () => {
    const testProduct = {
      id: 'test1',
      name: 'Test Product',
      price: 10,
      image: '/images/test-product.jpg',
      stock: 10,
    };
    addToCart(testProduct, 1);
    toast.success('Test product added to cart');
  };

  if (cart.length === 0) {
    return (
      <div className={styles.pageWrapper}>
        <Header />
        <div className={styles.emptyCart}>
          <h1>Tu carrito está vacío</h1>
          <button onClick={handleAddTestProduct} className={styles.checkoutButton}>
            Add Test Product (Debug)
          </button>
          <Link href="/products" className={styles.shopLink}>
            Ir a comprar
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className={styles.pageWrapper} aria-labelledby="cart-heading">
      <Header />
      <main className={styles.cartContainer}>
        <h1 id="cart-heading" className={styles.cartTitle}>
          Tu carrito ({totalItems} {totalItems === 1 ? 'producto' : 'productos'})
        </h1>
        <div className={styles.cartContent}>
          <ul className={styles.cartList} aria-live="polite">
            <AnimatePresence>
              {cart.map((item) => (
                <motion.li
                  key={item.id}
                  className={styles.cartItem}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className={styles.itemImage}>
                    <Image
                      src={item.image || '/images/default-product.jpg'}
                      alt={item.name}
                      width={80}
                      height={80}
                      className={styles.productImage}
                      priority={cart.indexOf(item) < 3}
                    />
                  </div>
                  <div className={styles.itemDetails}>
                    <span className={styles.itemName}>{item.name}</span>
                    <span className={styles.itemPrice}>${item.price.toFixed(2)}</span>
                    <span className={styles.itemSubtotal}>
                      Subtotal: ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                  <div className={styles.quantityControls}>
                    <button
                      onClick={() =>
                        handleQuantityChange(item.id, item.quantity - 1, item.stock)
                      }
                      disabled={item.quantity <= 1}
                      className={styles.quantityButton}
                      aria-label={`Reducir cantidad de ${item.name}`}
                    >
                      -
                    </button>
                    <span className={styles.quantityDisplay}>{item.quantity}</span>
                    <button
                      onClick={() =>
                        handleQuantityChange(item.id, item.quantity + 1, item.stock)
                      }
                      disabled={item.quantity >= item.stock}
                      className={styles.quantityButton}
                      aria-label={`Aumentar cantidad de ${item.name}`}
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => handleRemoveItem(item.id, item.name)}
                    className={styles.removeButton}
                    aria-label={`Eliminar ${item.name} del carrito`}
                  >
                    Eliminar
                  </button>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>

          <motion.aside
            className={styles.cartSummary}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2>Resumen del pedido</h2>
            <div className={styles.totalSection}>
              <div className={styles.totalRow}>
                <span className={styles.totalLabel}>Subtotal:</span>
                <span className={styles.totalValue}>${totalPrice.toFixed(2)}</span>
              </div>
              <div className={styles.totalRow}>
                <span className={styles.totalLabel}>Impuestos (15%):</span>
                <span className={styles.totalValue}>${taxes.toFixed(2)}</span>
              </div>
              <div className={styles.totalRow}>
                <span className={styles.totalLabel}>Total:</span>
                <span className={styles.totalPrice}>${finalTotal.toFixed(2)}</span>
              </div>
            </div>
            <button
              onClick={handleClearCart}
              className={styles.clearButton}
              aria-label="Vaciar carrito"
            >
              Vaciar carrito
            </button>
            <button
              onClick={handleCheckout}
              className={styles.checkoutButton}
              aria-label="Proceder al checkout"
            >
              Proceder al checkout
            </button>
            <Link href="/products" className={styles.shopLink}>
              Seguir comprando
            </Link>
          </motion.aside>
        </div>
      </main>
      <Footer />
    </div>
  );
}
