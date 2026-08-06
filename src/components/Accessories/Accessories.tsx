import { ProductList } from '../../Product/ProductList';
import { useSortedProducts } from '../../Sorting/Sorting';
import { useFetchProducts } from '../../api/products';
import { Loader } from '../Loader/Loader';
import { Pagination } from '../Pagination/Pagination';
import { usePagination } from '../Pagination/usePagination';

export const Accessories = () => {
  const { products, isLoading, errorMessage, refetch } = useFetchProducts();
  const accessories = products.filter(
    product => product.category === 'accessories',
  );
  const { sorted, setSearchParams } = useSortedProducts(accessories);
  const { perPage, paginatedItems, total, onPageChange, onPerPage } =
    usePagination(sorted);

  if (isLoading) return <Loader />;

  if (errorMessage)
    return (
      <div>
        <p>Oops, something went wrong</p>
        <button onClick={refetch}>Reload</button>
      </div>
    );

  return (
    <div>
      <select
        onChange={event => {
          setSearchParams({ sort: event.target.value });
        }}
      >
        <option value="age">Newest</option>
        <option value="price">Cheapest</option>
        <option value="title">Alphabetic</option>
      </select>
      <ProductList products={paginatedItems} />
      {perPage !== 'all' && (
        <Pagination
          total={total}
          onPageChange={onPageChange}
          perPage={Number(perPage)}
        />
      )}
      <select onChange={event => onPerPage(event.target.value)}>
        <option value="4">4</option>
        <option value="8">8</option>
        <option value="16">16</option>
        <option value="all">all</option>
      </select>
    </div>
  );
};
