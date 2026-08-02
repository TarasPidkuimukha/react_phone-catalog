import { ProductList } from '../../Product/ProductList';
import { useSortedProducts } from '../../Sorting/Sorting';
import { useFetchProducts } from '../../api/products';
import { Loader } from '../Loader/Loader';

export const Tablets = () => {
  const { products, isLoading, errorMessage, refetch } = useFetchProducts();
  const tablets = products.filter(product => product.category === 'tablets');
  const { sorted, sortType, setSearchParams } = useSortedProducts(tablets);

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
      <ProductList products={sorted} />
    </div>
  );
};
