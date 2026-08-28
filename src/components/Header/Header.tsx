import { NavLink } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useFavorite } from '../../context/FavoriteContext';

import './Header.scss';
import { useState } from 'react';
import classNames from 'classnames';
export const Header = () => {
  const { cart } = useCart();
  const { favoriteTotal } = useFavorite();
  const cartQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(prev => !prev);

  return (
    <header className="header">
      <div className="header__container">
        <div className="header__nav">
          <NavLink to="/" className="header__logo-link">
            <img src="img\Icons\Logo.svg" alt="logo" className="header__logo" />
          </NavLink>

          <button className="header__button" type="button" onClick={toggle}>
            <img src="img\Icons\burger menu.svg" alt="menu" />
          </button>
          <ul className="header__list">
            <li>
              <NavLink className="header__link" to={'/'}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink className="header__link" to={'/phones'}>
                Phones
              </NavLink>
            </li>
            <li>
              <NavLink className="header__link" to={'/tablets'}>
                Tablets
              </NavLink>
            </li>
            <li>
              <NavLink className="header__link" to={'/accessories'}>
                Accessories
              </NavLink>
            </li>
          </ul>
        </div>
        <ul className="header__actions">
          <li>
            <NavLink className="header__action" to={'/favorites'}>
              <img
                src="img\Icons\unselected heart icon.svg"
                alt=""
                className="header__icon"
              />
              {favoriteTotal > 0 && (
                <p className="header__badge">{favoriteTotal}</p>
              )}
            </NavLink>
          </li>
          <li className="header__item">
            <NavLink className="header__action" to={'/cart'}>
              <img
                src="img\Icons\cart icon.svg"
                alt="cart_icon"
                className="header__icon"
              />
              {cartQuantity > 0 && (
                <p className="header__badge">{cartQuantity}</p>
              )}
            </NavLink>
          </li>
        </ul>
      </div>

      <div
        className={classNames('header__mob', { 'header__mob--open': isOpen })}
      >
        <div className="header__mob-header">
          <NavLink to="/" className="header__logo-link">
            <img src="img\Icons\Logo.svg" alt="logo" className="header__logo" />
          </NavLink>
          <button className="header__button" type="button" onClick={toggle}>
            <img src="img\Icons\closing icon.svg" alt="x" />
          </button>
        </div>

        <ul className="header__list">
          <li>
            <NavLink
              className="header__link"
              to={'/'}
              onClick={() => setIsOpen(false)}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              className="header__link"
              to={'/phones'}
              onClick={() => setIsOpen(false)}
            >
              Phones
            </NavLink>
          </li>
          <li>
            <NavLink
              className="header__link"
              to={'/tablets'}
              onClick={() => setIsOpen(false)}
            >
              Tablets
            </NavLink>
          </li>
          <li>
            <NavLink
              className="header__link"
              to={'/accessories'}
              onClick={() => setIsOpen(false)}
            >
              Accessories
            </NavLink>
          </li>
        </ul>

        <ul className="header__actions">
          <li>
            <NavLink className="header__action" to={'/favorites'}>
              <img
                src="img\Icons\unselected heart icon.svg"
                alt=""
                className="header__icon"
              />
              {favoriteTotal > 0 && (
                <p className="header__badge">{favoriteTotal}</p>
              )}
            </NavLink>
          </li>
          <li>
            <NavLink className="header__action" to={'/cart'}>
              <img
                src="img\Icons\cart icon.svg"
                alt="cart_icon"
                className="header__icon"
              />
              {cartQuantity > 0 && (
                <p className="header__badge">{cartQuantity}</p>
              )}
            </NavLink>
          </li>
        </ul>
      </div>
    </header>
  );
};
