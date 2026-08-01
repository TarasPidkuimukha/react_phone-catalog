import { createContext, ReactNode, useContext, useState } from 'react';
import { Product } from '../Types/types';

interface FavoriteContentType {
  favorites: FavoriteItem[];
  addToFavorite: (product: Product) => void;
  removeFromFavorite: (product: Product) => void;
  favoriteTotal: number;
}

export interface FavoriteItem {
  product: Product;
}

interface FavoriteProviderProps {
  children: ReactNode;
}

export const FavoriteContext = createContext<FavoriteContentType | undefined>(
  undefined,
);

export const useFavorite = () => {
  const context = useContext(FavoriteContext);

  if (!context) {
    throw new Error('Error');
  }

  return context;
};

export const FavoriteProvider = ({ children }: FavoriteProviderProps) => {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);

  const addToFavorite = (product: Product) => {
    setFavorites(prevFav => {
      const exist = prevFav.find(item => item.product.id === product.id);

      if (exist) {
        return prevFav.map(item =>
          item.product.id === product.id ? { ...item, product } : item,
        );
      }

      return [...prevFav, { product }];
    });
  };

  const removeFromFavorite = (product: Product) => {
    setFavorites(preFav =>
      preFav.filter(item => item.product.id !== product.id),
    );
  };

  const favoriteTotal = favorites.length;

  return (
    <FavoriteContext.Provider
      value={{ favorites, addToFavorite, removeFromFavorite, favoriteTotal }}
    >
      {children}
    </FavoriteContext.Provider>
  );
};
