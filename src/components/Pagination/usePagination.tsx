import { useSearchParams } from 'react-router-dom';
import { Product } from '../../Types/types';

export const usePagination = (sorted: Product[]) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get('page')) ?? 1;
  const perPage = searchParams.get('perPage') ?? 'all';
  const start = Number(perPage) * (Number(page) - 1);
  const end = start + Number(perPage);
  const total = sorted.length;

  const paginatedItems = perPage === 'all' ? sorted : sorted.slice(start, end);

  const onPageChange = (page: any) => {
    if (page === 1) searchParams.delete(page);
    const newParam = page.toString();
    searchParams.set(newParam, page);
    setSearchParams(searchParams);
  };

  return { page, perPage, paginatedItems, total, onPageChange };
};
