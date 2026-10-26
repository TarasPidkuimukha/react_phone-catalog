import { Link } from 'react-router-dom';
import { Product } from '../../Types/types';

import { addToFavorite, removeFromFavorite } from '../../context/favoriteSlice';

import { addToCart, removeFromCart } from '../../context/cartSlice';

import './ProductCard.scss';
import { useAppDispatch, useAppSelector } from '../../app/hooks';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { cartProducts } = useAppSelector(state => state.cart);

  const dispatch = useAppDispatch();
  const { favorites } = useAppSelector(state => state.favorite);

  const findAddedItem = cartProducts.some(
    item => item.cartProduct.itemId === product.itemId,
  );
  const findFavItem = favorites.some(item => item.id === product.id);

  return (
    <div className="productCard">
      <Link to={`/product/${product.category}/${product.itemId}`}>
        <div className="productCard__container">
          <img
            className="productCard__img"
            src={product.image}
            alt="product photo"
          />
        </div>
        <span className="productCard__name">{product.name}</span>
      </Link>
      <section className="productCard__price">
        {product.price === product.fullPrice ? (
          <span>${product.price}</span>
        ) : (
          <>
            <span className="productCard__price--discount">
              ${product.price}
            </span>
            <span className="productCard__price--full">
              ${product.fullPrice}
            </span>
          </>
        )}
      </section>
      <hr className="productCard__divider" />
      <div className="productCard__info">
        <section className="productCard__info--section">
          <span className="productCard__info--section--title">Screen</span>
          <span className="productCard__info--section--value">
            {product.screen}
          </span>
        </section>
        <section className="productCard__info--section">
          <span className="productCard__info--section--title">Capacity</span>
          <span className="productCard__info--section--value">
            {product.capacity}
          </span>
        </section>

        <section className="productCard__info--section">
          <span className="productCard__info--section--title">RAM</span>
          <span className="productCard__info--section--value">
            {product.ram}
          </span>
        </section>
      </div>
      <div className="productCard__button">
        {findAddedItem ? (
          <button
            className="productCard__button--add--added"
            onClick={() => dispatch(removeFromCart(product.itemId))}
          >
            Added
          </button>
        ) : (
          <button
            className="productCard__button--add"
            onClick={() => dispatch(addToCart(product))}
          >
            Add to cart
          </button>
        )}
        {findFavItem ? (
          <button
            className="productCard__button--heart"
            onClick={() => dispatch(removeFromFavorite(product))}
          >
            <img
              src={`img/Icons/selected-heart-icon.svg`}
              alt="selected heart button"
            />
          </button>
        ) : (
          <button
            className="productCard__button--heart"
            onClick={() => dispatch(addToFavorite(product))}
          >
            <img
              src={`img/Icons/unselected-heart-icon.svg`}
              alt="unselected heart button"
            />
          </button>
        )}
      </div>
    </div>
  );
};
