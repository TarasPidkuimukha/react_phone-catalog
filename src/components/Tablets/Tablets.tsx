import { ProductList } from '../../Product/ProductList/ProductList';
import { useSortedProducts } from '../../Sorting/Sorting';
import { useFetchProducts } from '../../api/products';
import { Loader } from '../Loader/Loader';
import { Pagination } from '../Pagination/Pagination';
import { usePagination } from '../Pagination/usePagination';

export const Tablets = () => {
  const { products, isLoading, errorMessage, refetch } = useFetchProducts();
  const tablets = products.filter(product => product.category === 'tablets');
  const { sorted, sortType, setSearchParams } = useSortedProducts(tablets);
  const { page, perPage, paginatedItems, total, onPageChange, onPerPage } =
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
      <h1>Tablets</h1>

      <select onChange={event => onPerPage(event.target.value)}>
        <option value="4">4</option>
        <option value="8">8</option>
        <option value="16">16</option>
        <option value="all">all</option>
      </select>
      {tablets.length !== 0 ? (
        <div>
          <span>{tablets.length} models</span>
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
        </div>
      ) : (
        <p>There are no tablets</p>
      )}
      {perPage !== 'all' && (
        <Pagination
          total={total}
          onPageChange={onPageChange}
          perPage={Number(perPage)}
          currentPage={page}
        />
      )}
    </div>
  );
};
