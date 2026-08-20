import { Link } from 'react-router-dom';
import { Product, ProductDetails } from '../../Types/types';
import { useCart } from '../../context/CartContext';
import { useFavorite } from '../../context/FavoriteContext';
// import './ProductCard.scss';

interface ProductCardProps {
  product: ProductDetails | Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { cart, addToCart } = useCart();
  const { favorites, addToFavorite, removeFromFavorite } = useFavorite();
  const findAddedItem = cart.some(item => item.product.itemId === product.id);
  const findFavItem = favorites.some(
    item => item.product.itemId === product.id,
  );

  return (
    <div className="productCard">
      <div className="productCard__container">
        <Link to={`/product/${product.category}/${product.id}`}>
          <div>
            <img
              className="productCard__img"
              src={product.images[0]} //треба мапити
              alt="product photo"
            />
            <span className="productCard__name">{product.name}</span>
          </div>
        </Link>
        <section className="productCard__price">
          {product.priceDiscount === product.priceRegular ? (
            <p>{product.priceDiscount}</p>
          ) : (
            <>
              <p>{product.priceRegular}</p>
              <p className="productCard__price--discount">
                {product.priceDiscount}
              </p>
            </>
          )}
        </section>
        <div className="productCard__info">
          <section>
            <p className="productCard__title">Screen</p>
            <p className="productCard__value">{product.screen}</p>
          </section>
          <section>
            <p className="productCard__title">Capacity</p>
            <p className="productCard__value">{product.capacity}</p>
          </section>
          <section>
            <p className="productCard__title">RAM</p>
            <p className="productCard__value">{product.ram}</p>
          </section>
          {findAddedItem ? (
            <button className="productCard__button--add">Added to cart</button>
          ) : (
            <button
              className="productCard__button--add"
              onClick={() => addToCart(product)}
            >
              Add to cart
            </button>
          )}
          {findFavItem ? (
            <button
              className="productCard__button--heart"
              onClick={() => removeFromFavorite(product)}
            >
              <img src="" alt="selected heart button" />
            </button>
          ) : (
            <button
              className="productCard__button--heart"
              onClick={() => addToFavorite(product)}
            >
              <img src="" alt="unselected heart button" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
