import { useState } from 'react';
import { Product } from '../../Types/types';
import { ProductCard } from '../ProductCard/ProductCard';
import './ProductSlider.scss';

interface ProductsSliderProps {
  products: Product[];
  title: string;
}

export const ProductsSlider: React.FC<ProductsSliderProps> = ({
  products,
  title,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const visibleCards = products.slice(currentIndex, currentIndex + 4);

  return (
    <div className="productSlider">
      <div className="productSlider__header">
        <h2 className="productSlider__title">{title}</h2>
        <div className="productSlider__buttons">
          <button
            className="productSlider__button"
            onClick={() =>
              setCurrentIndex(
                (currentIndex - 4 + products.length) % products.length,
              )
            }
          >
            &lsaquo;
          </button>
          <button
            className="productSlider__button"
            onClick={() =>
              setCurrentIndex((currentIndex + 4) % products.length)
            }
          >
            &rsaquo;
          </button>
        </div>
      </div>
      <div className="productSlider__content">
        {visibleCards.map(product => (
          <ProductCard key={product.id} product={product} title={''} />
        ))}
      </div>
    </div>
  );
};
