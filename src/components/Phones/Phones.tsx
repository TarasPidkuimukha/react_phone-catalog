import { Pagination } from '../Pagination/Pagination';
import { ProductList } from '../../Product/ProductList/ProductList';
import { useSortedProducts } from '../../Sorting/Sorting';
import { useFetchProducts } from '../../api/products';
import { Loader } from '../Loader/Loader';
import { usePagination } from '../Pagination/usePagination';
// import './Phones.scss';

export const Phones = () => {
  const { products, isLoading, errorMessage, refetch } = useFetchProducts();
  const phones = products.filter(product => product.category === 'phones');
  const { sorted, sortType, setSearchParams } = useSortedProducts(phones);
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
    <div className="phones">
      <h1 className="title">Mobile Phones</h1>
      <span>{phones.length} models</span>

      <select
        className="phones__perPager"
        onChange={event => onPerPage(event.target.value)}
      >
        <option value="4">4</option>
        <option value="8">8</option>
        <option value="16">16</option>
        <option value="all">all</option>
      </select>
      <select
        className="phones__sortBy"
        onChange={event => {
          setSearchParams({ sort: event.target.value });
        }}
      >
        <option value="age">Newest</option>
        <option value="price">Cheapest</option>
        <option value="title">Alphabetic</option>
      </select>
      {phones.length !== 0 ? (
        <div className="phones__content">
          <ProductList products={paginatedItems} />
        </div>
      ) : (
        <p>There are no phones</p>
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
