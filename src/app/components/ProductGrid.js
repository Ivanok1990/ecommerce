'use client';

import { useState } from 'react';
import ProductCard from './ProductCard';
import ProductDetailModal from './ProductDetailModal';
import { useCart } from '@/app/context/CartContext';
import styles from '@/app/styles/Products.module.css';

const ProductGrid = ({ products = [] }) => {
  const { addToCart } = useCart();
  const [selectedProduct, setSelectedProduct] = useState(null);

  const validProducts = products.filter(
    (product) => product?.id && product?.name
  );

  if (validProducts.length === 0) {
    return (
      <div className={styles.noProducts}>
        No se encontraron productos.
      </div>
    );
  }

  const handleAddToCart = (product, quantity) => {
    console.log(`Adding ${quantity} of ${product.name} to cart`); // Debugging
    addToCart(product, quantity);
    setSelectedProduct(null); // Close the modal after adding
  };

  return (
    <>
      <div className={styles.productGrid}>
        {validProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onClick={() => setSelectedProduct(product)}
          />
        ))}
      </div>

      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={handleAddToCart}
        />
      )}
    </>
  );
};

export default ProductGrid;