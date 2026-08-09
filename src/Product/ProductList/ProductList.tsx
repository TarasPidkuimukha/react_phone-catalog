import { Product } from '../../Types/types';
import { ProductCard } from '../ProductCard/ProductCard';

interface ProductListProps {
  products: Product[];
}

export const ProductList: React.FC<ProductListProps> = ({ products }) => {
  return (
    <div>
      {products.length > 0 ? (
        products.map(product => (
          <div>
            <ProductCard key={product.id} product={product} />
          </div>
        ))
      ) : (
        <p>No Products</p>
      )}
    </div>
  );
};
