'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import styles from '@/app/styles/Cart.module.css'; // Reuse cart styles for consistency

export default function ReceiptPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Parse order details from query parameters
  const order = JSON.parse(searchParams.get('order') || '{}');
  const { purchaseCode, items = [], subtotal = 0, taxes = 0, total = 0, fullName = '' } = order;

  useEffect(() => {
    if (!purchaseCode || !items.length) {
      // If no order details, redirect to cart
      router.push('/cart');
    }
  }, [purchaseCode, items, router]);

  // Animation variants for the "Felicidades" message
  const congratsVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
        repeat: 1,
        repeatType: 'reverse',
      },
    },
  };

  return (
    <div className={styles.pageWrapper}>
      <Header />
      <main className={styles.cartContainer} style={{ textAlign: 'center' }}>
        <motion.h1
          variants={congratsVariants}
          initial="hidden"
          animate="visible"
          style={{ color: '#E75480', marginBottom: '1rem' }}
        >
          🎉 Felicidades {fullName || 'Cliente'}, se realizó tu compra
        </motion.h1>
        <p style={{ fontSize: '1.2rem', color: '#6D4C5B', marginBottom: '2rem' }}>
          Código de compra: <strong>{purchaseCode || 'N/A'}</strong>
        </p>

        <h2 style={{ color: '#6D4C5B', marginBottom: '1.5rem' }}>
          Detalles de tu pedido
        </h2>
        <div className={styles.cartContent}>
          <ul className={styles.cartList}>
            {items.map((item) => (
              <li key={item.id} className={styles.cartItem}>
                <div className={styles.itemDetails}>
                  <span className={styles.itemName}>{item.name}</span>
                  <span className={styles.itemPrice}>
                    ${item.price.toFixed(2)} x {item.quantity}
                  </span>
                  <span className={styles.itemSubtotal}>
                    Subtotal: ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              </li>
            ))}
          </ul>

          <aside className={styles.cartSummary}>
            <h2>Resumen</h2>
            <div className={styles.totalSection}>
              <div className={styles.totalRow}>
                <span className={styles.totalLabel}>Subtotal:</span>
                <span className={styles.totalValue}>${subtotal.toFixed(2)}</span>
              </div>
              <div className={styles.totalRow}>
                <span className={styles.totalLabel}>Impuestos (15%):</span>
                <span className={styles.totalValue}>${taxes.toFixed(2)}</span>
              </div>
              <div className={styles.totalRow}>
                <span className={styles.totalLabel}>Total:</span>
                <span className={styles.totalPrice}>${total.toFixed(2)}</span>
              </div>
            </div>
            <Link href="/products" className={styles.shopLink}>
              Seguir comprando
            </Link>
          </aside>
        </div>
      </main>
      <Footer />
    </div>
  );
}
