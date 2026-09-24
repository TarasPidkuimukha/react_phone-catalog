import {
  useCart,
  CartItemType,
} from '../../../context/CartContext';
import './CartItem.scss';

export const CartItem: React.FC<CartItemType> = ({
  product,
  quantity,
}) => {
  const {
    decreaseQuantity,
    increaseQuantity,
    removeFromCart,
  } = useCart();

  return (
    <div className="cartItem">
      <div className="cartItem__info">
        <button
          className="cartItem__info-btn"
          onClick={() => removeFromCart(product.itemId)}
        >
          <img
            src={`${import.meta.env.BASE_URL}/img/Icons/closing-icon.svg`}
            alt="x"
          />
        </button>

        <img
          className="cartItem__info-img"
          src={product.image}
        />

        <p className="cartItem__info-title">
          {product.name}
        </p>
      </div>
      <div className="cartItem__actions">
        <div className="cartItem__quantity">
          <button
            className="cartItem__quantity-btn"
            onClick={() => decreaseQuantity(product.itemId)}
          >
            -
          </button>
          <p className="cartItem__quantity-value">
            {quantity}
          </p>

          <button
            className="cartItem__quantity-btn"
            onClick={() => increaseQuantity(product.itemId)}
          >
            +
          </button>
        </div>
        <p className="cartItem__price">${product.price}</p>
      </div>
    </div>
  );
};
