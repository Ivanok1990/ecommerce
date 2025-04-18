'use client';

import { useState } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import styles from '@/app/styles/Products.module.css';

const CATEGORIES = [
    { id: 'todos', name: 'Todos' },
    { id: 'mate', name: 'Labiales Mate' },
    { id: 'gloss', name: 'Gloss Brillante' },
    { id: 'liquido', name: 'Larga Duración' },
    { id: 'bálsamo', name: 'Bálsamos' },
];

const COLORS = [
    { code: '#FF0000', name: 'Rojo' },
    { code: '#C71585', name: 'Rosa Oscuro' },
    { code: '#FF69B4', name: 'Rosa Brillante' },
    { code: '#F5D5C0', name: 'Nude' },
    { code: '#8B0000', name: 'Vino' },
    { code: '#FFD700', name: 'Dorado' },
];

const ProductFilter = () => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const initialFilters = {
        category: searchParams.get('category') || 'todos',
        color: searchParams.get('color') || '',
        minPrice: parseInt(searchParams.get('minPrice')) || 0,
        maxPrice: parseInt(searchParams.get('maxPrice')) || 50,
    };

    const [filters, setFilters] = useState(initialFilters);

    const updateUrlParams = (newFilters) => {
        const params = new URLSearchParams();
        if (newFilters.category !== 'todos') params.set('category', newFilters.category);
        if (newFilters.color) params.set('color', newFilters.color);
        if (newFilters.minPrice > 0) params.set('minPrice', newFilters.minPrice);
        if (newFilters.maxPrice < 50) params.set('maxPrice', newFilters.maxPrice);
        router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    };

    const handleFilterChange = (filterType, value) => {
        const newFilters = { ...filters, [filterType]: value };
        setFilters(newFilters);
        updateUrlParams(newFilters);
    };

    const resetFilters = () => {
        const defaultFilters = {
            category: 'todos',
            color: '',
            minPrice: 0,
            maxPrice: 50,
        };
        setFilters(defaultFilters);
        router.replace(pathname, { scroll: false });
    };

    return (
        <aside className={styles.filterSection}>
            <header>
                <h2>Filtrar Productos</h2>
                <button onClick={resetFilters} className={styles.resetButton}>
                    Limpiar Filtros
                </button>
            </header>

            <section className={styles.filterGroup}>
                <h3>Categorías</h3>
                <div className={styles.categoryFilters}>
                    {CATEGORIES.map((category) => (
                        <button
                            key={category.id}
                            className={`${styles.filterButton} ${
                                filters.category === category.id ? styles.active : ''
                            }`}
                            onClick={() => handleFilterChange('category', category.id)}
                            aria-label={`Filtrar por categoría ${category.name}`}
                        >
                            {category.name}
                        </button>
                    ))}
                </div>
            </section>

            <section className={styles.filterGroup}>
                <h3>Colores</h3>
                <div className={styles.colorFilters}>
                    {COLORS.map((color) => (
                        <button
                            key={color.code}
                            className={`${styles.colorButton} ${
                                filters.color === color.code ? styles.active : ''
                            }`}
                            style={{ backgroundColor: color.code }}
                            onClick={() => handleFilterChange('color', color.code)}
                            aria-label={`Filtrar por color ${color.name}`}
                            title={color.name}
                        />
                    ))}
                </div>
            </section>

            <section className={styles.filterGroup}>
                <h3>Rango de Precio</h3>
                <div className={styles.priceRange}>
                    <span>${filters.minPrice}</span>
                    <span>${filters.maxPrice}</span>
                </div>
                <div>
                    <input
                        type="range"
                        min="0"
                        max="50"
                        value={filters.minPrice}
                        onChange={(e) => handleFilterChange('minPrice', parseInt(e.target.value))}
                        className={styles.priceSlider}
                        aria-label="Precio mínimo"
                    />
                    <input
                        type="range"
                        min="0"
                        max="50"
                        value={filters.maxPrice}
                        onChange={(e) => handleFilterChange('maxPrice', parseInt(e.target.value))}
                        className={styles.priceSlider}
                        aria-label="Precio máximo"
                    />
                </div>
            </section>
        </aside>
    );
};

export default ProductFilter;