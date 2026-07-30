import { createContext, useContext, useState } from 'react';
import { Product } from '../Types/types';

interface CartContextType {
  cart: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
  increaseQuantity: (id: number) => void;
  decreaseQuantity: (id: number) => void;
  cartTotal: number;
}

export const CartContext = createContext<CartContextType | undefined>(
  undefined,
);

export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('Error');
  }

  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState<Product[]>([]);

  const addToCart = product => {
    setCart(prevCart => {
      const exist = prevCart.find(item => item.product.id === product.id);

      if (exist) {
        return prevCart.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      return [...prevCart, { product, quantity: 1 }];
    });
  };

  const increaseQuantity = (id: number) => {
    setCart(prevCart =>
      prevCart.map(item =>
        item.product.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      ),
    );
  };

  const decreaseQuantity = (id: number) => {
    setCart(prevCart =>
      prevCart
        .map(item =>
          item.product.id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item,
        )
        .filter(item => item.quantity > 0),
    );
  };
  const removeFromCart = (id: number) => {
    setCart(prevCart => prevCart.filter(item => item.product.id !== id));
  };

  const cartTotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
