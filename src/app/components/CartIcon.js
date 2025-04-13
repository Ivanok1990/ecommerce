'use client';

import Link from 'next/link';
import { useCart } from '@/app/context/CartContext';
import styles from '@/app/styles/Header.module.css';
import 'boxicons/css/boxicons.min.css';
export default function CartIcon() {
    const { totalItems } = useCart();

    return (
        <Link href="/cart" className={styles.cartLink}>
            <i className="bx bx-cart-alt"></i>
            {totalItems > 0 && (
                <span className={styles.cartBadge}>{totalItems}</span>
            )}
        </Link>
    );
}