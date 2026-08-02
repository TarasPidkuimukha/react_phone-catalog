import { ProductList } from '../../Product/ProductList';
import { useFetchProducts } from '../../api/products';
import { Loader } from '../Loader/Loader';

export const Accessories = () => {
  const { products, isLoading, errorMessage } = useFetchProducts();

  if (isLoading) return <Loader />;

  if (errorMessage)
    return <button>Something went wrong message with a reload button</button>;
  const accessories = products.filter(
    product => product.category === 'accessories',
  );
  return (
    <div>
      <ProductList products={accessories} />
    </div>
  );
};
