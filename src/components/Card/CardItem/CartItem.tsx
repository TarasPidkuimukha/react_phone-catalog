import classNames from 'classnames';
import { useCart, CartItemType } from '../../../context/CartContext';
// import './CartItem.scss';

export const CartItem: React.FC<CartItemType> = ({ product, quantity }) => {
  const { decreaseQuantity, increaseQuantity, removeFromCart } = useCart();

  return (
    <div className="cartItem">
      <button
        className="cartItem__removeButton"
        onClick={() => removeFromCart(product.itemId)}
      >
        x
      </button>
      <img src="" />
      <p> {product.name}</p>
      <button
        className="cartItem__buttons"
        onClick={() => increaseQuantity(product.itemId)}
      >
        +
      </button>
      <p>{quantity}</p>
      <button
        className="cartItem__buttons"
        onClick={() => decreaseQuantity(product.itemId)}
      >
        -
      </button>
      <p className="cartItem__price">{product.price}</p>
    </div>
  );
};

// className={classNames()}- використовувати
// прибрати модулі, звичайни scss краще
//переробити так щоб всюди де рендериться список карток продуктів, треба щоб фетчилось з масиву products.json,
//  а там де сторінка конкретного товару, де є весь опис то фетчиться з phones.json ітд
