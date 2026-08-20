import { useState } from 'react';
import { Product } from '../../Types/types';
import { ProductCard } from '../ProductCard/ProductCard';
// import './ProductSlider.scss';

interface ProductsSliderProps {
  products: Product[];
}

export const ProductsSlider: React.FC<ProductsSliderProps> = ({ products }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const visibleCards = products.slice(currentIndex, currentIndex + 4);

  return (
    <div className="productSLider">
      <button
        className="productSLider__buttons"
        onClick={() =>
          setCurrentIndex(
            (currentIndex - 4 + products.length) % products.length,
          )
        }
      >
        &lsaquo;
      </button>
      <div className="productSLider__content">
        {visibleCards.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <button
        className="productSLider__buttons"
        onClick={() => setCurrentIndex((currentIndex + 4) % products.length)}
      >
        &rsaquo;
      </button>
    </div>
  );
};
