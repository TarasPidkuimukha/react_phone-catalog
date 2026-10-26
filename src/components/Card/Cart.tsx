import { CartItem } from '../Card/CardItem/CartItem';

import { useNavigate } from 'react-router-dom';
import './Cart.scss';
import { useAppDispatch, useAppSelector } from '../../app/hooks';

import {
  clearCart,
  selectCartQuantity,
  selectCartTotal,
} from '../../context/cartSlice';

export const Cart = () => {
  const { cartProducts } = useAppSelector(state => state.cart);

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const cartQuantity = useAppSelector(selectCartQuantity);

  const cartTotal = useAppSelector(selectCartTotal);

  return (
    <div className="cart">
      <div className="cart__content">
        <div className="cart__back">
          <button
            type="button"
            className="cart__back"
            onClick={() => navigate(-1)}
          >
            <span>&lsaquo;</span>
            <span>Back</span>
          </button>
        </div>

        <h2 className="cart__title">Cart</h2>
        <div className="cart__main">
          <div className="cart__list">
            {cartProducts.length > 0 ? (
              cartProducts.map(item => (
                <CartItem
                  key={item.cartProduct.itemId}
                  cartProduct={item.cartProduct}
                  quantity={item.quantity}
                />
              ))
            ) : (
              <p className="cart__empty">Your cart is empty</p>
            )}
          </div>
          {cartProducts.length > 0 ? (
            <div className="cart__checkout">
              <h3 className="cart__checkout-total">${cartTotal}</h3>
              <p className="cart__checkout-count">
                Total for {cartQuantity} items
              </p>
              <hr className="cart__checkout-divider" />
              {cartProducts.length > 0 && (
                <button
                  type="button"
                  className="cart__checkout-btn"
                  onClick={() => {
                    window.confirm('Checkout is not implemented yet');
                    dispatch(clearCart());
                  }}
                >
                  Checkout
                </button>
              )}
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};
