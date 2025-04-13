// src/app/components/Header.js
'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Suspense, useState } from 'react';
import CartIcon from './CartIcon';
import { SearchProducts } from '@/application/usecases/searchProducts';
import styles from '@/app/styles/header.module.css';
import 'boxicons/css/boxicons.min.css';

function HeaderContent() {
    const [query, setQuery] = useState('');
    const router = useRouter();
    const searchProducts = new SearchProducts();

    const handleSearch = (e) => {
        e.preventDefault();
        searchProducts.execute(query, router);
    };

    return (
        <header className={styles.header}>
            <nav className={styles.nav}>
                <Link href="/" className={styles.logo}>
                    <span className={styles.logoMain}>Glamour</span>
                    <span className={styles.logoSecondary}>Lips</span>
                </Link>

                {/* Barra de búsqueda */}
                <form onSubmit={handleSearch} className={styles.searchContainer}>
                    <i className="bx bx-search-alt-2"></i>
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Buscar labiales..."
                        className={styles.searchInput}
                    />
                </form>

                {/* Iconos de usuario/carrito */}
                <div className={styles.iconsContainer}>
                    <button className={styles.iconButton}>
                        <i className="bx bx-user"></i>
                        <span className={styles.iconLabel}>Mi cuenta</span>
                    </button>
                    <Link href="/products" className={styles.logo}>
                        <button className={styles.iconButton}>
                            <i className="bx bx-heart"></i>
                            <span className={styles.iconLabel}>Coleccion</span>
                        </button>
                    </Link>

                    <CartIcon />
                </div>
            </nav>
        </header>
    );
}

export default function Header() {
    return (
        <Suspense fallback={<div>Loading header...</div>}>
            <HeaderContent />
        </Suspense>
    );
}