'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import ProductGrid from '@/app/components/ProductGrid';
import ProductFilter from '@/app/components/ProductFilter';
import styles from '@/app/styles/Products.module.css';

// Simulated FetchProducts use case (replace with actual implementation)
class FetchProducts {
    async execute(queryString) {
        try {
            const response = await fetch(`/api/products?${queryString}`, {
                headers: { 'Content-Type': 'application/json' },
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();

            // Calculate pagination metadata (update if API provides it)
            const limit = parseInt(queryString.match(/limit=(\d+)/)?.[1]) || 20;
            const page = parseInt(queryString.match(/page=(\d+)/)?.[1]) || 1;
            const pagination = {
                total: data.length,
                totalPages: Math.ceil(data.length / limit),
                currentPage: page,
                perPage: limit,
            };

            return { data, pagination };
        } catch (error) {
            throw new Error('Failed to fetch products: ' + error.message);
        }
    }
}

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
    const router = useRouter();
    const fetchProductsUseCase = new FetchProducts();

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);

            try {
                const params = new URLSearchParams(searchParams.toString());
                if (!params.has('page')) params.set('page', '1');
                if (!params.has('limit')) params.set('limit', pagination.perPage.toString());

                const { data, pagination: paginationData } = await fetchProductsUseCase.execute(params.toString());

                // Validate and filter products
                const validData = Array.isArray(data)
                    ? data.filter((product) => product?.id && product?.name && product?.price != null)
                    : [];
                setProducts(validData);
                setPagination(paginationData);
            } catch (error) {
                console.error('Error fetching products:', error);
                setError(error.message || 'No se pudieron cargar los productos. Intenta de nuevo.');
                setProducts([]);
            } finally {
                setLoading(false);
            }
        };

        // Debounce fetching to avoid rapid re-renders
        const timer = setTimeout(fetchData, 300);
        return () => clearTimeout(timer);
    }, [searchParams]);

    const handlePageChange = (newPage) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('page', newPage.toString());
        router.push(`/products?${params.toString()}`, { scroll: false });
    };

    const handleRetry = () => {
        const params = new URLSearchParams(searchParams.toString());
        fetchProductsUseCase.execute(params.toString());
    };

    return (
        <>
            <Header />
            <main className={styles.productsPage} aria-labelledby="products-heading">
                <section className={styles.productsHero}>
                    <div className={styles.heroContent}>
                        <h1 id="products-heading">Nuestra Colección Completa</h1>
                        <p>Descubre todos nuestros labiales premium</p>
                    </div>
                </section>

                <div className={styles.contentWrapper}>
                    <aside className={styles.filterSidebar}>
                        <Suspense fallback={<div className={styles.loading}>Cargando filtros...</div>}>
                            <ProductFilter />
                        </Suspense>
                    </aside>

                    <section className={styles.productsSection}>
                        {loading ? (
                            <div className={styles.loadingContainer} role="status">
                                <div className={styles.loadingSpinner} aria-hidden="true"></div>
                                <p>Cargando productos...</p>
                            </div>
                        ) : error ? (
                            <div className={styles.errorContainer} role="alert">
                                <p className={styles.errorMessage}>{error}</p>
                                <button
                                    onClick={handleRetry}
                                    className={styles.retryButton}
                                    aria-label="Reintentar carga de productos"
                                >
                                    Reintentar
                                </button>
                            </div>
                        ) : (
                            <Suspense fallback={<div className={styles.loading}>Cargando productos...</div>}>
                                {products.length === 0 ? (
                                    <div className={styles.noProducts}>
                                        No se encontraron productos que coincidan con los filtros.
                                    </div>
                                ) : (
                                    <ProductGrid products={products} />
                                )}
                            </Suspense>
                        )}

                        {pagination.totalPages > 1 && (
                            <nav className={styles.pagination} aria-label="Navegación de paginación">
                                <button
                                    disabled={pagination.currentPage === 1}
                                    onClick={() => handlePageChange(pagination.currentPage - 1)}
                                    className={styles.paginationButton}
                                    aria-label="Página anterior"
                                >
                                    Anterior
                                </button>
                                <span aria-current={pagination.currentPage}>
                  Página {pagination.currentPage} de {pagination.totalPages}
                </span>
                                <button
                                    disabled={pagination.currentPage === pagination.totalPages}
                                    onClick={() => handlePageChange(pagination.currentPage + 1)}
                                    className={styles.paginationButton}
                                    aria-label="Página siguiente"
                                >
                                    Siguiente
                                </button>
                            </nav>
                        )}
                    </section>
                </div>

                <section className={styles.newsletter} aria-labelledby="newsletter-heading">
                    <h2 id="newsletter-heading">Recibe novedades y promociones</h2>
                    <form className={styles.newsletterForm} onSubmit={(e) => e.preventDefault()}>
                        <input
                            type="email"
                            placeholder="Tu correo electrónico"
                            className={styles.newsletterInput}
                            aria-label="Correo electrónico para suscripción"
                            required
                        />
                        <button
                            type="submit"
                            className={styles.newsletterButton}
                            aria-label="Suscribirse al boletín"
                        >
                            Suscribirse
                        </button>
                    </form>
                </section>
            </main>
            <Footer />
        </>
    );
}

export default function ProductsPage() {
    return (
        <Suspense fallback={<div className={styles.loading}>Cargando página de productos...</div>}>
            <ProductsContent />
        </Suspense>
    );
}

export const dynamic = 'force-dynamic';