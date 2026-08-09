import { useState } from 'react';
import { Product } from '../../Types/types';
import { ProductCard } from '../ProductCard/ProductCard';

interface ProductsSliderProps {
  products: Product[];
}

export const ProductsSlider: React.FC<ProductsSliderProps> = ({ products }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const visibleCards = products.slice(currentIndex, currentIndex + 4);

  return (
    <div>
      <button
        onClick={() =>
          setCurrentIndex(
            (currentIndex - 4 + products.length) % products.length,
          )
        }
      >
        &lsaquo;
      </button>
      {visibleCards.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
      <button
        onClick={() => setCurrentIndex((currentIndex + 4) % products.length)}
      >
        &rsaquo;
      </button>
    </div>
  );
};
