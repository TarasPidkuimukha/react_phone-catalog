import { configureStore } from '@reduxjs/toolkit';

import favoriteReducer from '../context/favoriteSlice';

import cartReducer from '../context/cartSlice';

export const store = configureStore({
  reducer: {
    favorite: favoriteReducer,
    cart: cartReducer,
  },
});

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;

store.subscribe(() => {
  localStorage.setItem(
    'favorites',
    JSON.stringify(store.getState().favorite.favorites),
  );
  localStorage.setItem(
    'cart',
    JSON.stringify(store.getState().cart.cartProducts),
  );
});

// export type AppThunk<ReturnType = void> = ThunkAction<RootState, ReturnType>;
