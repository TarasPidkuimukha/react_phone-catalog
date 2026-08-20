import { CartItem } from '../Card/CardItem/CartItem';
import { useCart } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';
// import './Cart.scss';

export const Cart = () => {
  const { cart, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();

  const cartQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="cart">
      <div className="cart__content">
        <button className="cart__backButton" onClick={() => navigate(-1)}>
          Back
        </button>
        <h2 className="title">Cart</h2>
        {cart.length > 0 ? (
          cart.map(item => (
            <div className="cart__items">
              <CartItem
                key={item.product.id}
                product={item.product}
                quantity={item.quantity}
              />
            </div>
          ))
        ) : (
          <p>Your cart is empty</p>
        )}
      </div>
      <div className="cart__checkout">
        <h3>{cartTotal}</h3>
        <p>Total for {cartQuantity} items</p>
        {cart.length > 0 && (
          <button
            className="cart__checkoutButton"
            onClick={() => {
              window.confirm(
                'Checkout is not implemented yet. Do you want to clear the Cart?',
              );
              clearCart();
            }}
          >
            Checkout
          </button>
        )}
      </div>
    </div>
  );
};
