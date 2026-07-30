import { createContext, useContext, useState } from 'react';
import { Product } from '../Types/types';

interface FavoriteContentType {
  favorites: Product[];
  addToFavorite: (product: Product) => void;
  removeFromFavorite: (product: Product) => void;
  favoriteTotal: number;
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

export const FavoriteProvider = ({ children }) => {
  const [favorites, setFavorites] = useState<Product[]>([]);

  const addToFavorite = product => {
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

  const removeFromFavorite = product => {
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
