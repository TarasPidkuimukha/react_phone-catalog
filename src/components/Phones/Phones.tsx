import { useEffect, useState } from 'react';
import { getProducts } from '../../api/fetching';
import { Product } from '../../Types/types';
import { ProductList } from '/Users/misko/.giteverything/ts/ts_tasks/react_phone-catalog/src/Product/ProductList';

export const Phones = () => {
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
  const phones = products.filter(product => product.category === 'phones');

  return (
    <div>
      <ProductList products={phones} />
    </div>
  );
};
