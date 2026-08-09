import { useNavigate, useParams } from 'react-router-dom';
import { useFetchProducts } from '../../api/products';
import { useFavorite } from '../../context/FavoriteContext';
import { useCart } from '../../context/CartContext';
import { ProductCard } from '../ProductCard/ProductCard';
import { Loader } from '../../components/Loader/Loader';
import { Product } from '../../Types/types';

type ProductDetailsProps = {
  products: Product[];
};

export const ProductDetailsPage: React.FC<ProductDetailsProps> = () => {
  const { products, isLoading, errorMessage, refetch } = useFetchProducts();
  const { productId } = useParams();
  const { cart, addToCart } = useCart();
  const navigate = useNavigate();

  const { favorites, addToFavorite, removeFromFavorite } = useFavorite();
  if (isLoading) return <Loader />;

  if (errorMessage)
    return (
      <div>
        <p>Oops, something went wrong</p>
        <button onClick={refetch}>Reload</button>
      </div>
    );

  const sortedById = products.find(product => product.id === Number(productId));

  if (!sortedById)
    return (
      <div>
        <p>No product found</p>
      </div>
    );

  const findAddedItem = cart.some(item => item.product.id === sortedById.id);
  const findFavItem = favorites.some(item => item.product.id === sortedById.id);
  const shuffled = () => {
    const filtered = [...products].filter(
      product => product.id !== sortedById.id,
    );

    for (let i = filtered.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [filtered[i], filtered[j]] = [filtered[j], filtered[i]];
    }
    return filtered.slice(0, 3);
  };
  const recommended = shuffled();

  return (
    <div>
      <button onClick={() => navigate(-1)}>Back</button>
      <h2>{sortedById.name}</h2>
      <span>Available colors</span>
      <p>Select capacity</p>
      <p>${sortedById.price}</p>
      {findAddedItem ? (
        <button>Added to cart</button>
      ) : (
        <button onClick={() => addToCart(sortedById)}>Add to cart</button>
      )}
      {findFavItem ? (
        <button onClick={() => removeFromFavorite(sortedById)}>
          <img src="" alt="selected heart button" />
        </button>
      ) : (
        <button onClick={() => addToFavorite(sortedById)}>
          <img src="" alt="unselected heart button" />
        </button>
      )}
      <div>
        <p>screen{sortedById.screen}</p>
        <p>Resolution {sortedById.resolution}</p>
        <p>Processor {sortedById.processor}</p>
        <p>RAM {sortedById.ram}</p>
      </div>
      <div>
        <h3>About</h3>
        <h4>And then there was Pro</h4>
        {sortedById.description.map((item, index) => (
          <div key={index}>
            <h4>{item.title}</h4>
            <p>{item.text}</p>
          </div>
        ))}
        {/* поки нехай буде так, а коли вже буду бачити реальний текс додам мап на
        масив {item.title} та {item.text} щоб показувався правильно  */}
        <h3>You may also like</h3>
        {recommended.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
        <button>&lsaquo;</button>
        <button>&rsaquo;</button>
      </div>
    </div>
  );
};
