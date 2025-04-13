'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/app/context/CartContext';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import styles from '@/app/styles/Checkout.module.css';

// Añade esta línea para desactivar el prerenderizado estático
export const dynamic = 'force-dynamic';

export default function CheckoutPage() {
    const { cart, totalPrice, clearCart } = useCart();
    const router = useRouter();

    const TAX_RATE = 0.15;
    const taxes = totalPrice * TAX_RATE;
    const finalTotal = totalPrice + taxes;

    // Estado del formulario
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        address: '',
        city: '',
        postalCode: '',
        phone: '',
        cardNumber: '',
        expiry: '',
        cvv: '',
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [orderSuccess, setOrderSuccess] = useState(false);

    // Manejar cambios en el formulario
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Validar formulario
    const validateForm = () => {
        const newErrors = {};

        if (!formData.fullName.trim()) newErrors.fullName = 'El nombre es requerido';
        if (!formData.email.trim()) {
            newErrors.email = 'El email es requerido';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email inválido';
        }
        if (!formData.address.trim()) newErrors.address = 'La dirección es requerida';
        if (!formData.city.trim()) newErrors.city = 'La ciudad es requerida';
        if (!formData.postalCode.trim()) {
            newErrors.postalCode = 'El código postal es requerido';
        } else if (!/^\d{5}$/.test(formData.postalCode)) {
            newErrors.postalCode = 'Código postal inválido (5 dígitos)';
        }
        if (!formData.phone.trim()) {
            newErrors.phone = 'El teléfono es requerido';
        } else if (!/^\d{10}$/.test(formData.phone)) {
            newErrors.phone = 'Teléfono inválido (10 dígitos)';
        }
        if (!formData.cardNumber.trim()) {
            newErrors.cardNumber = 'El número de tarjeta es requerido';
        } else if (!/^\d{16}$/.test(formData.cardNumber)) {
            newErrors.cardNumber = 'Número de tarjeta inválido (16 dígitos)';
        }
        if (!formData.expiry.trim()) {
            newErrors.expiry = 'La fecha de expiración es requerida';
        } else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(formData.expiry)) {
            newErrors.expiry = 'Formato MM/AA inválido';
        }
        if (!formData.cvv.trim()) newErrors.cvv = 'El CVV es requerido';
        else if (!/^\d{3}$/.test(formData.cvv)) {
            newErrors.cvv = 'CVV inválido (3 dígitos)';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Manejar envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsSubmitting(true);
        try {
            await new Promise((resolve) => setTimeout(resolve, 2000));
            clearCart();
            setOrderSuccess(true);
            setTimeout(() => {
                router.push('/products');
            }, 3000);
        } catch (error) {
            console.error('Error al procesar la orden:', error);
            setErrors({ submit: 'Error al procesar la orden. Intenta de nuevo.' });
        } finally {
            setIsSubmitting(false);
        }
    };

    if (orderSuccess) {
        return (
            <div className={styles.successContainer}>
                <Header />
                <motion.div
                    className={styles.successMessage}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h1>¡Orden confirmada!</h1>
                    <p>Gracias por tu compra. Serás redirigido a la tienda en breve.</p>
                    <Link href="/products" className={styles.backLink}>
                        Volver a la tienda ahora
                    </Link>
                </motion.div>
                <Footer />
            </div>
        );
    }

    if (cart.length === 0) {
        return (
            <div className={styles.emptyContainer}>
                <Header />
                <div className={styles.emptyCart}>
                    <h1>Tu carrito está vacío</h1>
                    <Link href="/products" className={styles.shopLink}>
                        Ir a comprar
                    </Link>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className={styles.checkoutContainer}>
            <Header />
            <h1 className={styles.checkoutTitle}>Checkout</h1>
            <div className={styles.checkoutGrid}>
                <div className={styles.orderSummary}>
                    <h2>Resumen del pedido</h2>
                    <ul className={styles.cartList}>
                        <AnimatePresence>
                            {cart.map((item) => (
                                <motion.li
                                    key={item.id}
                                    className={styles.cartItem}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <Image
                                        src={item.image || '/placeholder-lipstick.jpg'}
                                        alt={item.name}
                                        width={60}
                                        height={60}
                                        className={styles.productImage}
                                    />
                                    <div className={styles.itemDetails}>
                                        <span className={styles.itemName}>{item.name}</span>
                                        <span className={styles.itemPrice}>
                                            ${item.price.toFixed(2)} x {item.quantity}
                                        </span>
                                        <span className={styles.itemSubtotal}>
                                            ${(item.price * item.quantity).toFixed(2)}
                                        </span>
                                    </div>
                                </motion.li>
                            ))}
                        </AnimatePresence>
                    </ul>
                    <div className={styles.totalSection}>
                        <div className={styles.totalRow}>
                            <span className={styles.totalLabel}>Subtotal:</span>
                            <span className={styles.totalValue}>${totalPrice.toFixed(2)}</span>
                        </div>
                        <div className={styles.totalRow}>
                            <span className={styles.totalLabel}>Impuestos (16%):</span>
                            <span className={styles.totalValue}>${taxes.toFixed(2)}</span>
                        </div>
                        <div className={styles.totalRow}>
                            <span className={styles.totalLabel}>Total:</span>
                            <span className={styles.totalPrice}>${finalTotal.toFixed(2)}</span>
                        </div>
                    </div>
                </div>

                <form className={styles.checkoutForm} onSubmit={handleSubmit}>
                    <h2>Información de envío y pago</h2>

                    <div className={styles.formSection}>
                        <h3>Envío</h3>
                        <div className={styles.formGroup}>
                            <label htmlFor="fullName">Nombre completo</label>
                            <input
                                type="text"
                                id="fullName"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleInputChange}
                                className={errors.fullName ? styles.inputError : ''}
                            />
                            {errors.fullName && (
                                <span className={styles.errorMessage}>{errors.fullName}</span>
                            )}
                        </div>
                        {/* Resto de los campos del formulario... */}
                    </div>

                    <div className={styles.formSection}>
                        <h3>Pago</h3>
                        <div className={styles.formGroup}>
                            <label htmlFor="cardNumber">Número de tarjeta</label>
                            <input
                                type="text"
                                id="cardNumber"
                                name="cardNumber"
                                value={formData.cardNumber}
                                onChange={handleInputChange}
                                className={errors.cardNumber ? styles.inputError : ''}
                                placeholder="1234 5678 9012 3456"
                            />
                            {errors.cardNumber && (
                                <span className={styles.errorMessage}>{errors.cardNumber}</span>
                            )}
                        </div>
                        {/* Resto de los campos de pago... */}
                    </div>

                    {errors.submit && (
                        <span className={styles.errorMessage}>{errors.submit}</span>
                    )}

                    <button
                        type="submit"
                        className={styles.submitButton}
                        disabled={isSubmitting}
                    >
                        {isSubmitting
                            ? 'Procesando...'
                            : `Confirmar compra ($${finalTotal.toFixed(2)})`}
                    </button>
                </form>
            </div>
            <Link href="/cart" className={styles.backLink}>
                Volver al carrito
            </Link>
            <Footer />
        </div>
    );
}