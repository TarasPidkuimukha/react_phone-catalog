import { useEffect, useState } from 'react';
import { Product } from '../Types/types';
import { getProducts } from './fetching';

export const useFetchProducts = () => {
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

  return { products, isLoading, errorMessage };
};
