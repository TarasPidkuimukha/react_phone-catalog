import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../Types/types';

export interface FavoriteState {
  favorites: Product[];
}

const savedFavs = (): Product[] => {
  const existingFavs = localStorage.getItem('favorites');

  if (existingFavs === null) {
    return [];
  } else {
    return JSON.parse(existingFavs);
  }
};

const initialState: FavoriteState = {
  favorites: savedFavs(),
};

export const favoriteSlice = createSlice({
  name: 'favorite',
  initialState,
  reducers: {
    addToFavorite: (state, action: PayloadAction<Product>) => {
      const exist = state.favorites.find(item => item.id === action.payload.id);

      if (!exist) {
        state.favorites.push(action.payload);
      }
    },
    removeFromFavorite: (state, action: PayloadAction<Product>) => {
      state.favorites = state.favorites.filter(
        item => item.id !== action.payload.id,
      );
    },
  },
});

export default favoriteSlice.reducer;

export const { addToFavorite, removeFromFavorite } = favoriteSlice.actions;
