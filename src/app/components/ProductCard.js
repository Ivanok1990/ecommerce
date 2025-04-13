import { useCart } from '@/app/context/CartContext';

export default function ProductCard({ product }) {
    const { addToCart } = useCart();

    return (
        <div>
            <h3>{product.name}</h3>
            <p>${product.price}</p>
            <button onClick={() => addToCart(product, 1)}>Add to Cart</button>
        </div>
    );
}