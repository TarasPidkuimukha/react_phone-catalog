import { ProductList } from '../../Product/ProductList/ProductList';
import { useSortedProducts } from '../../Sorting/Sorting';
import { useFetchProducts } from '../../api/products';
import { Loader } from '../Loader/Loader';
import { Pagination } from '../Pagination/Pagination';
import { usePagination } from '../Pagination/usePagination';
// import './Accessorie.scss';

export const Accessories = () => {
  const { products, isLoading, errorMessage, refetch } = useFetchProducts();
  const accessories = products.filter(
    product => product.category === 'accessories',
  );
  const { sorted, setSearchParams } = useSortedProducts(accessories);
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
    <div className="accessories">
      <h1 className="title">Accessories</h1>
      <span>{accessories.length} models</span>

      <select
        className="accessories__perPage"
        onChange={event => onPerPage(event.target.value)}
      >
        <option value="4">4</option>
        <option value="8">8</option>
        <option value="16">16</option>
        <option value="all">all</option>
      </select>
      <select
        className="accessories__sortBy"
        onChange={event => {
          setSearchParams({ sort: event.target.value });
        }}
      >
        <option value="age">Newest</option>
        <option value="price">Cheapest</option>
        <option value="title">Alphabetic</option>
      </select>
      {accessories.length !== 0 ? (
        <div className="accessories__content">
          <ProductList products={paginatedItems} />
        </div>
      ) : (
        <p>There are no accessories</p>
      )}
      {perPage !== 'all' && (
        <div className="accessories__pagination">
          <Pagination
            total={total}
            onPageChange={onPageChange}
            perPage={Number(perPage)}
            currentPage={page}
          />
        </div>
      )}
    </div>
  );
};
