import { useState, useEffect } from 'react';
import { getProducts } from '../../api/fetching';
import { Product } from '../../Types/types';
import { ProductList } from '/Users/misko/.giteverything/ts/ts_tasks/react_phone-catalog/src/Product/ProductList';

export const Accessories = () => {
  const [products, setProducts] = useState<Product[]>([]);

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setErrorMessage('');
    getProducts()
      .then(setProducts)
      .catch(() => setErrorMessage('Unable to load products'))
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setErrorMessage('');
    }, 3000);
    return () => clearTimeout(timer);
  }, [errorMessage]);

  const accessories = products.filter(
    product => product.category === 'accessories',
  );
  return (
    <div>
      <ProductList products={accessories} />
    </div>
  );
};
