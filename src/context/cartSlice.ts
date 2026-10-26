import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../Types/types';
import type { RootState } from '../app/store';

export interface CartItemType {
  cartProduct: Product;
  quantity: number;
}

export interface CartState {
  cartProducts: CartItemType[];
}

const savedCart = (): CartItemType[] => {
  const savedItems = localStorage.getItem('cart');

  if (savedItems === null) {
    return [];
  } else {
    return JSON.parse(savedItems);
  }
};

const initialState: CartState = {
  cartProducts: savedCart(),
};

export const selectCartQuantity = (state: RootState) => {
  return state.cart.cartProducts.reduce((sum, item) => {
    return sum + item.quantity;
  }, 0);
};

export const selectCartTotal = (state: RootState) => {
  return state.cart.cartProducts.reduce(
    (sum, item) => sum + item.cartProduct.price * item.quantity,
    0,
  );
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const exist = state.cartProducts.find(
        item => item.cartProduct.itemId === action.payload.itemId,
      );

      if (!exist) {
        state.cartProducts.push({ cartProduct: action.payload, quantity: 1 });
      }
    },

    removeFromCart: (state, action: PayloadAction<string>) => {
      state.cartProducts = state.cartProducts.filter(
        item => item.cartProduct.itemId !== action.payload,
      );
    },

    increaseQuantity: (state, action: PayloadAction<string>) => {
      const findItem = state.cartProducts.find(
        item => item.cartProduct.itemId === action.payload,
      );

      if (findItem) {
        findItem.quantity += 1;
      }
    },

    decreaseQuantity: (state, action: PayloadAction<string>) => {
      const foundItem = state.cartProducts.find(
        item => item.cartProduct.itemId === action.payload,
      );

      if (foundItem) {
        foundItem.quantity -= 1;
      }

      state.cartProducts = state.cartProducts.filter(
        item => item.quantity !== 0,
      );
    },

    clearCart: state => {
      state.cartProducts = [];
    },
  },
});

export default cartSlice.reducer;

export const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} = cartSlice.actions;
