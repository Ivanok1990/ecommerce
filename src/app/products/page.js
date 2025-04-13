'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import ProductGrid from '@/app/components/ProductGrid';
import ProductFilter from '@/app/components/ProductFilter';
import styles from '@/app/styles/Products.module.css';

export default function ProductsPage() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [pagination, setPagination] = useState({
        total: 0,
        totalPages: 1,
        currentPage: 1,
        perPage: 20
    });
    const searchParams = useSearchParams();

    const fetchProducts = async () => {
        setLoading(true);
        setError(null);

        try {
            // Construir parámetros de búsqueda
            const params = new URLSearchParams(searchParams);

            // Asegurar parámetros mínimos
            if (!params.get('page')) params.set('page', '1');
            if (!params.get('limit')) params.set('limit', '20');

            const response = await fetch(`/api/products?${params.toString()}`);

            if (!response.ok) {
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }

            const { data, pagination: paginationData } = await response.json();

            // Verificar que la respuesta sea válida
            if (!Array.isArray(data)) {
                throw new Error('Formato de respuesta inválido');
            }

            setProducts(data);
            setPagination(paginationData);
        } catch (error) {
            console.error("Error fetching products:", error);
            setError(error.message || "No se pudieron cargar los productos");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // Pequeño delay para evitar sobrecarga en cambios rápidos de filtros
        const timer = setTimeout(fetchProducts, 300);
        return () => clearTimeout(timer);
    }, [searchParams]);

    const handlePageChange = (newPage) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', newPage);
        window.location.search = params.toString();
    };

    if (loading) {
        return (
            <div className={styles.loadingContainer}>
                <div className={styles.loadingSpinner}></div>
                <p>Cargando productos...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className={styles.errorContainer}>
                <p className={styles.errorMessage}>{error}</p>
                <button
                    onClick={fetchProducts}
                    className={styles.retryButton}
                >
                    Reintentar
                </button>
            </div>
        );
    }

    return (
        <>
            <Header />

            <main className={styles.productsPage}>
                {/* Hero Section */}
                <section className={styles.productsHero}>
                    <div className={styles.heroContent}>
                        <h1>Nuestra Colección Completa</h1>
                        <p>Descubre todos nuestros labiales premium</p>
                    </div>
                </section>

                {/* Filtros */}
                <ProductFilter />

                {/* Grid de productos */}
                <ProductGrid products={products} />

                {/* Paginación */}
                {pagination.totalPages > 1 && (
                    <div className={styles.pagination}>
                        <button
                            disabled={pagination.currentPage === 1}
                            onClick={() => handlePageChange(pagination.currentPage - 1)}
                        >
                            Anterior
                        </button>

                        <span>
              Página {pagination.currentPage} de {pagination.totalPages}
            </span>

                        <button
                            disabled={pagination.currentPage === pagination.totalPages}
                            onClick={() => handlePageChange(pagination.currentPage + 1)}
                        >
                            Siguiente
                        </button>
                    </div>
                )}

                {/* Newsletter */}
                <section className={styles.newsletter}>
                    <h2>Recibe novedades y promociones</h2>
                    <div className={styles.newsletterForm}>
                        <input
                            type="email"
                            placeholder="Tu correo electrónico"
                            className={styles.newsletterInput}
                        />
                        <button className={styles.newsletterButton}>
                            Suscribirse
                        </button>
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
}