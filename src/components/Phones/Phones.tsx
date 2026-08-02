import { ProductList } from '../../Product/ProductList';
import { useFetchProducts } from '../../api/products';
import { Loader } from '../Loader/Loader';

export const Phones = () => {
  const { products, isLoading, errorMessage } = useFetchProducts();

  if (isLoading) return <Loader />;

  if (errorMessage) return <button>Something went wrong message with a reload button</button>;
  const phones = products.filter(product => product.category === 'phones');

  return (
    <div>
      <ProductList products={phones} />
    </div>
  );
};
