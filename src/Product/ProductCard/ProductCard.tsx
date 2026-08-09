import { Product } from '../../Types/types';
import { useCart } from '../../context/CartContext';
import { useFavorite } from '../../context/FavoriteContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { cart, addToCart } = useCart();
  const { favorites, addToFavorite, removeFromFavorite } = useFavorite();
  const findAddedItem = cart.some(item => item.product.id === product.id);
  const findFavItem = favorites.some(item => item.product.id === product.id);

  return (
    <div>
      <img src="" alt="product photo" />
      <span>{product.name}</span>
      <section>
        {product.priceDiscount === product.price ? (
          <p>{product.price}</p>
        ) : (
          <>
            <p>{product.price}</p>
            <p>{product.priceDiscount}</p>
          </>
        )}
      </section>
      <div>
        <section>
          <p>Screen</p>
          <p>{product.screen}</p>
        </section>
        <section>
          <p>Capacity</p>
          <p>{product.capacity}</p>
        </section>
        <section>
          <p>RAM</p>
          <p>{product.ram}</p>
        </section>
        {findAddedItem ? (
          <button>Added to cart</button>
        ) : (
          <button onClick={() => addToCart(product)}>Add to cart</button>
        )}
        {findFavItem ? (
          <button onClick={() => removeFromFavorite(product)}>
            <img src="" alt="selected heart button" />
          </button>
        ) : (
          <button onClick={() => addToFavorite(product)}>
            <img src="" alt="unselected heart button" />
          </button>
        )}
      </div>
    </div>
  );
};
