import { ProductList } from '../../Product/ProductList';
import { useFetchProducts } from '../../api/products';
import { Loader } from '../Loader/Loader';

export const Tablets = () => {
  const { products, isLoading, errorMessage } = useFetchProducts();

    if (isLoading) return <Loader />;

  if (errorMessage)
    return <button>Something went wrong message with a reload button</button>;

  const tablets = products.filter(product => product.category === 'tablets');
  return (
    <div>
      <ProductList products={tablets} />
    </div>
  );
};
