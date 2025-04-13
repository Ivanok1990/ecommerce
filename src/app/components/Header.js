'use client';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import CartIcon from './CartIcon';
import styles from '@/app/styles/header.module.css';
import 'boxicons/css/boxicons.min.css';

export default function Header() {
    const [query, setQuery] = useState('');
    const router = useRouter();
    const searchParams = useSearchParams();

    const handleSearch = (e) => {
        e.preventDefault();
        if (query.trim()) {
            // Crear nuevos query params preservando los existentes
            const params = new URLSearchParams(searchParams.toString());
            params.set('q', query.trim());
            // Actualizar la URL sin recargar la página
            router.push(`/products?${params.toString()}`);
        } else {
            // Si el query está vacío, eliminar el parámetro 'q'
            const params = new URLSearchParams(searchParams.toString());
            params.delete('q');
            router.push(`/products?${params.toString()}`);
        }
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