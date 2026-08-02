import { useSearchParams } from 'react-router-dom';
import { Product } from '../Types/types';

export const useSortedProducts = (products: Product[]) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortType = searchParams.get('sort');

  const sorted = [...products].sort((a, b) => {
    switch (sortType) {
      case 'title':
        return b.name.localeCompare(a.name);
      case 'age':
        return b.year - a.year;
      case 'price':
        return b.price - a.price;

      default:
        return 0;
    }
  });

  return { sorted, sortType, setSearchParams };
};
