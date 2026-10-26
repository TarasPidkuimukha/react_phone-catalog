import { Link } from 'react-router-dom';

import './CartItem.scss';

import {
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  CartItemType,
} from '../../../context/cartSlice';
import { useAppDispatch } from '../../../app/hooks';

export const CartItem: React.FC<CartItemType> = ({ cartProduct, quantity }) => {
  const dispatch = useAppDispatch();

  return (
    <div className="cartItem">
      <div className="cartItem__info">
        <button
          className="cartItem__info-btn"
          onClick={() => dispatch(removeFromCart(cartProduct.itemId))}
        >
          <img src={`img/Icons/closing-icon.svg`} alt="x" />
        </button>
        <Link
          className="cartItem__info-link"
          to={`/product/${cartProduct.category}/${cartProduct.itemId}`}
        >
          <img className="cartItem__info-img" src={cartProduct.image} />

          <p className="cartItem__info-title">{cartProduct.name}</p>
        </Link>
      </div>
      <div className="cartItem__actions">
        <div className="cartItem__quantity">
          <button
            className="cartItem__quantity-btn"
            onClick={() => dispatch(decreaseQuantity(cartProduct.itemId))}
          >
            -
          </button>
          <p className="cartItem__quantity-value">{quantity}</p>

          <button
            className="cartItem__quantity-btn"
            onClick={() => dispatch(increaseQuantity(cartProduct.itemId))}
          >
            +
          </button>
        </div>
        <p className="cartItem__price">${cartProduct.price}</p>
      </div>
    </div>
  );
};

//треба додати діспатч
