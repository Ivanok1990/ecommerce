// src/application/usecases/searchProducts.js
export class SearchProducts {
    execute(query, existingParams = '') {
        const params = new URLSearchParams(existingParams);
        if (query.trim()) {
            params.set('q', query.trim());
        } else {
            params.delete('q');
        }
        return `/products?${params.toString()}`;
    }
}