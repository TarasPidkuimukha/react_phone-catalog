import { createRoot } from 'react-dom/client';
import { App } from './App';
import { BrowserRouter } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { FavoriteProvider } from './context/FavoriteContext';

createRoot(document.getElementById('root') as HTMLElement).render(
  <CartProvider>
    <FavoriteProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </FavoriteProvider>
  </CartProvider>,
);
