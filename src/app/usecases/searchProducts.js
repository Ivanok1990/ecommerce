// src/application/usecases/searchProducts.js
import { useSearchParams } from 'next/navigation';

export class SearchProducts {
    execute(query, router) {
        const searchParams = useSearchParams();
        const params = new URLSearchParams(searchParams.toString());

        if (query.trim()) {
            params.set('q', query.trim());
        } else {
            params.delete('q');
        }

        router.push(`/products?${params.toString()}`);
    }
}