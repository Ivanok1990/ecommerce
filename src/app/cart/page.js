'use client';

import { useCart } from '@/app/context/CartContext';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Suspense } from 'react';
import styles from '../styles/Cart.module.css';
import Footer from '../components/Footer';
import Header from "@/app/components/Header";

// Componente de carrito separado para poder usar Suspense
function CartContent() {
    const { cart, removeFromCart, updateQuantity, clearCart, totalPrice } = useCart();

    return (
        <div className={styles.cartContainer}>
            <h1 className={styles.cartTitle}>Your Cart</h1>
            {cart.length === 0 ? (
                <div className={styles.emptyCart}>
                    <p>Your cart is empty.</p>
                    <Link href="/products" className={styles.shopLink}>
                        Shop Now
                    </Link>
                </div>
            ) : (
                <>
                    <ul className={styles.cartList}>
                        <AnimatePresence>
                            {cart.map(item => (
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
                                            src={item.image || '/placeholder-lipstick.jpg'}
                                            alt={item.name}
                                            width={80}
                                            height={80}
                                            className={styles.productImage}
                                        />
                                    </div>
                                    <div className={styles.itemDetails}>
                                        <span className={styles.itemName}>{item.name}</span>
                                        <span className={styles.itemPrice}>
                      ${item.price.toFixed(2)} x {item.quantity}
                    </span>
                                        <span className={styles.itemSubtotal}>
                      Subtotal: ${(item.price * item.quantity).toFixed(2)}
                    </span>
                                    </div>
                                    <div className={styles.quantityControls}>
                                        <button
                                            className={styles.quantityButton}
                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                            aria-label={`Increase quantity of ${item.name}`}
                                        >
                                            +
                                        </button>
                                        <span className={styles.quantityDisplay}>{item.quantity}</span>
                                        <button
                                            className={styles.quantityButton}
                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                            disabled={item.quantity <= 1}
                                            aria-label={`Decrease quantity of ${item.name}`}
                                        >
                                            -
                                        </button>
                                    </div>
                                    <button
                                        className={styles.removeButton}
                                        onClick={() => removeFromCart(item.id)}
                                        aria-label={`Remove ${item.name} from cart`}
                                    >
                                        Remove
                                    </button>
                                </motion.li>
                            ))}
                        </AnimatePresence>
                    </ul>
                    <div className={styles.cartSummary}>
                        <button
                            className={styles.clearButton}
                            onClick={clearCart}
                            aria-label="Clear all items from cart"
                        >
                            Clear Cart
                        </button>
                        <div className={styles.totalSection}>
                            <span className={styles.totalLabel}>Total:</span>
                            <span className={styles.totalPrice}>${totalPrice.toFixed(2)}</span>
                        </div>
                        <Link href="/checkout">
                            <button className={styles.checkoutButton} aria-label="Proceed to checkout">
                                Proceed to Checkout
                            </button>
                        </Link>
                    </div>
                </>
            )}
        </div>
    );
}

export default function Page() {
    return (
        <>
            <Suspense fallback={<div>Loading header...</div>}>
                <Header />
            </Suspense>
            <CartContent />
            <Footer />
        </>
    );
}