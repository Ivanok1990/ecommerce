// src/app/products/page.js
'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import ProductGrid from '@/app/components/ProductGrid';
import ProductFilter from '@/app/components/ProductFilter';
import { FetchProducts } from '@/app/usecases/fetchProducts';
import styles from '@/app/styles/Products.module.css';

export const dynamic = 'force-dynamic';

function ProductsContent() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [pagination, setPagination] = useState({
        total: 0,
        totalPages: 1,
        currentPage: 1,
        perPage: 20,
    });
    const searchParams = useSearchParams();
    const fetchProductsUseCase = new FetchProducts();

    useEffect(() => {
        const timer = setTimeout(async () => {
            setLoading(true);
            setError(null);

            try {
                const params = new URLSearchParams(searchParams.toString());
                if (!params.get('page')) params.set('page', '1');
                if (!params.get('limit')) params.set('limit', '20');

                const { data, pagination: paginationData } = await fetchProductsUseCase.execute(params.toString());

                const validData = Array.isArray(data)
                    ? data.filter((product) => product && product.id && product.name)
                    : [];
                setProducts(validData);
                setPagination(paginationData || pagination);
            } catch (error) {
                console.error('Error fetching products:', error);
                setError(error.message || 'No se pudieron cargar los productos. Intenta de nuevo.');
                setProducts([]);
            } finally {
                setLoading(false);
            }
        }, 300);

        return () => clearTimeout(timer);
    }, [searchParams]);

    const handlePageChange = (newPage) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('page', newPage);
        window.location.search = params.toString();
    };

    return (
        <>
            <Header />
            <main className={styles.productsPage}>
                <section className={styles.productsHero}>
                    <div className={styles.heroContent}>
                        <h1>Nuestra Colección Completa</h1>
                        <p>Descubre todos nuestros labiales premium</p>
                    </div>
                </section>

                <Suspense fallback={<div>Loading filters...</div>}>
                    <ProductFilter />
                </Suspense>

                {loading ? (
                    <div className={styles.loadingContainer}>
                        <div className={styles.loadingSpinner}></div>
                        <p>Cargando productos...</p>
                    </div>
                ) : error ? (
                    <div className={styles.errorContainer}>
                        <p className={styles.errorMessage}>{error}</p>
                        <button
                            onClick={() => fetchProductsUseCase.execute(searchParams.toString())}
                            className={styles.retryButton}
                        >
                            Reintentar
                        </button>
                    </div>
                ) : (
                    <Suspense fallback={<div>Loading products...</div>}>
                        <ProductGrid products={products} />
                    </Suspense>
                )}

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

                <section className={styles.newsletter}>
                    <h2>Recibe novedades y promociones</h2>
                    <div className={styles.newsletterForm}>
                        <input
                            type="email"
                            placeholder="Tu correo electrónico"
                            className={styles.newsletterInput}
                        />
                        <button className={styles.newsletterButton}>Suscribirse</button>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}

export default function ProductsPage() {
    return (
        <Suspense fallback={<div>Loading products page...</div>}>
            <ProductsContent />
        </Suspense>
    );
}