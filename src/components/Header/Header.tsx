import { NavLink } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useFavorite } from '../../context/FavoriteContext';

// import './Header.scss';
export const Header = () => {
  const { cart } = useCart();
  const { favoriteTotal } = useFavorite();
  const cartQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="header">
      <div className="header__container">
        <img src="" alt="logo" className="logo" />
        <ul>
          <li>
            <NavLink className="header__navLink" to={'/'}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink className="header__navLink" to={'/phones'}>
              Phones
            </NavLink>
          </li>
          <li>
            <NavLink className="header__navLink " to={'/tablets'}>
              Tablets
            </NavLink>
          </li>
          <li>
            <NavLink className="header__navLink" to={'/accessories'}>
              Accessories
            </NavLink>
          </li>
        </ul>
        <ul>
          <li>
            <NavLink className="header__navLink" to={'/favorites'}>
              <img src="" alt="" className="header__fav-icon" />
              {favoriteTotal > 0 && <p>{favoriteTotal}</p>}
            </NavLink>
          </li>
          <li>
            <NavLink className="header__navLink" to={'/cart'}>
              <img src="" alt="" className="header__cart-icon" />
              {cartQuantity > 0 && <p>{cartQuantity}</p>}
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};
