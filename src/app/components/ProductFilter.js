// src/app/components/ProductFilter.js
'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import styles from '@/app/styles/Products.module.css';

function ProductFilterContent() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [filters, setFilters] = useState({
        category: searchParams.get('category') || 'todos',
        color: searchParams.get('color') || '',
        minPrice: parseInt(searchParams.get('minPrice')) || 0,
        maxPrice: parseInt(searchParams.get('maxPrice')) || 50,
    });

    const categories = [
        { id: 'todos', name: 'Todos' },
        { id: 'mate', name: 'Labiales Mate' },
        { id: 'gloss', name: 'Gloss Brillante' },
        { id: 'liquido', name: 'Larga Duración' },
    ];

    const colors = [
        { code: '#FF0000', name: 'Rojo' },
        { code: '#C71585', name: 'Rosa Oscuro' },
        { code: '#FF69B4', name: 'Rosa Brillante' },
        { code: '#F5D5C0', name: 'Nude' },
        { code: '#8B5D5D', name: 'Marrón Rosado' },
    ];

    const handleFilterChange = (filterType, value) => {
        const newFilters = { ...filters, [filterType]: value };
        setFilters(newFilters);

        const params = new URLSearchParams();
        if (newFilters.category && newFilters.category !== 'todos') {
            params.set('category', newFilters.category);
        }
        if (newFilters.color) {
            params.set('color', newFilters.color);
        }
        if (newFilters.minPrice > 0) {
            params.set('minPrice', newFilters.minPrice);
        }
        if (newFilters.maxPrice < 50) {
            params.set('maxPrice', newFilters.maxPrice);
        }

        router.replace(`${pathname}?${params.toString()}`);
    };

    const resetFilters = () => {
        setFilters({
            category: 'todos',
            color: '',
            minPrice: 0,
            maxPrice: 50,
        });
        router.replace(pathname);
    };

    return (
        <div className={styles.filterSection}>
            <div className={styles.filterHeader}>
                <h2>Filtrar Productos</h2>
                <button onClick={resetFilters} className={styles.resetButton}>
                    Limpiar Filtros
                </button>
            </div>

            <div className={styles.filterGroup}>
                <h3>Categorías</h3>
                <div className={styles.categoryFilters}>
                    {categories.map((category) => (
                        <button
                            key={category.id}
                            className={`${styles.filterButton} ${filters.category === category.id ? styles.activeFilter : ''}`}
                            onClick={() => handleFilterChange('category', category.id)}
                        >
                            {category.name}
                        </button>
                    ))}
                </div>
            </div>

            <div className={styles.filterGroup}>
                <h3>Colores</h3>
                <div className={styles.colorFilters}>
                    {colors.map((color) => (
                        <button
                            key={color.code}
                            className={`${styles.colorButton} ${filters.color === color.code ? styles.activeColor : ''}`}
                            style={{ backgroundColor: color.code }}
                            aria-label={`Filtrar por color ${color.name}`}
                            onClick={() => handleFilterChange('color', color.code)}
                            title={color.name}
                        />
                    ))}
                </div>
            </div>

            <div className={styles.filterGroup}>
                <h3>Rango de Precio</h3>
                <div className={styles.priceRangeValues}>
                    <span>${filters.minPrice}</span>
                    <span>${filters.maxPrice}</span>
                </div>
                <div className={styles.priceSliderContainer}>
                    <input
                        type="range"
                        min="0"
                        max="50"
                        step="1"
                        value={filters.minPrice}
                        onChange={(e) => handleFilterChange('minPrice', parseInt(e.target.value))}
                        className={styles.priceSlider}
                    />
                    <input
                        type="range"
                        min="0"
                        max="50"
                        step="1"
                        value={filters.maxPrice}
                        onChange={(e) => handleFilterChange('maxPrice', parseInt(e.target.value))}
                        className={styles.priceSlider}
                    />
                </div>
            </div>
        </div>
    );
}

export default function ProductFilter() {
    return (
        <Suspense fallback={<div>Loading filters...</div>}>
            <ProductFilterContent />
        </Suspense>
    );
}