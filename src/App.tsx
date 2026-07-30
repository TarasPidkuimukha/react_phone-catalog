import { Route, Routes } from 'react-router-dom';
import './App.scss';
import { HomePage } from './components/HomePage/HomePage';
import { Phones } from './components/Phones/Phones';
import { Tablets } from './components/Tablets/Tablets';
import { Favorites } from './components/Favorite/Favorites';
import { Cart } from './components/Cart/Cart';
import { Accessories } from './components/Accessories/Accessories';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { NotFoundPage } from './components/NotFoundPage/NotFoundPage';

export const App = () => (
  <div className="content">
    <div>
      <Header />
    </div>
    <main>
      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/phones" element={<Phones />} />
          <Route path="/tablets" element={<Tablets />} />
          <Route path="/accessories" element={<Accessories />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </main>

    <div>
      <Footer />
    </div>
  </div>
);

export default App;
