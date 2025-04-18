// src/app/usecases/fetchProducts.js
export class FetchProducts {
    /**
     * Ejecuta la búsqueda de productos con los parámetros especificados
     * @param {Object} params - Parámetros de búsqueda
     * @param {string} [params.q] - Término de búsqueda
     * @param {string} [params.category] - Categoría del producto
     * @param {string} [params.color] - Color del producto
     * @param {number} [params.minPrice] - Precio mínimo
     * @param {number} [params.maxPrice] - Precio máximo
     * @param {number} [params.page] - Página actual
     * @param {number} [params.limit] - Límite de resultados por página
     * @param {string} [params.sortBy] - Campo para ordenar (price, name, created_at, popularity)
     * @param {string} [params.sortOrder] - Orden (asc, desc)
     * @returns {Promise<{data: Array, pagination: Object, filters: Object}>}
     */
    async execute(params = {}) {
        // Construir query string eliminando parámetros undefined/null
        const queryParams = new URLSearchParams();

        for (const [key, value] of Object.entries(params)) {
            if (value !== undefined && value !== null && value !== '') {
                queryParams.append(key, value);
            }
        }

        const response = await fetch(`/api/products?${queryParams.toString()}`);

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(
                errorData.error || `Error ${response.status}: ${response.statusText}`,
                { cause: errorData.details }
            );
        }

        const result = await response.json();

        if (!result.success) {
            throw new Error(result.error || 'Error en la respuesta del servidor', {
                cause: result.details
            });
        }

        return {
            data: result.data || [],
            pagination: result.pagination || {
                total: 0,
                totalPages: 0,
                currentPage: 1,
                perPage: 20,
                hasNextPage: false,
                hasPrevPage: false
            },
            filters: result.filters || { applied: {} }
        };
    }

    /**
     * Método de conveniencia para obtener la primera página de productos
     * @param {Object} filters - Filtros a aplicar
     * @returns {Promise<{data: Array, pagination: Object}>}
     */
    async getFirstPage(filters = {}) {
        return this.execute({ ...filters, page: 1 });
    }
}