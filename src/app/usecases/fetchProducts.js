// src/app/usecases/fetchProducts.js
export class FetchProducts {
    async execute(queryString) {
        const response = await fetch(`/api/products?${queryString}`);
        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        const { data, pagination } = await response.json();
        if (!Array.isArray(data)) {
            throw new Error('Formato de respuesta inválido');
        }
        return { data, pagination };
    }
}