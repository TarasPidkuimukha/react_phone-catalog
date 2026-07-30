import { NavLink } from 'react-router-dom';

export const Header = () => {
  return (
    <nav className="header">
      <div className="container">
        <ul>
          <NavLink to={'/'} className="header__logo">
            <img src="" alt="" />
          </NavLink>

          <NavLink className="" to={'/'}>
            Home
          </NavLink>
          <NavLink to={'/phones'}>Phones</NavLink>
          <NavLink to={'/tablets'}>Tablets</NavLink>
          <NavLink to={'/accessories'}>Accessories</NavLink>
        </ul>
        <ul>
          <NavLink to={'/favorite'}>
            <img src="" alt="" className="fav-icon" />
          </NavLink>
          <NavLink to={'/cart'}>
            <img src="" alt="" className="cart-icon" />
          </NavLink>
        </ul>
      </div>
    </nav>
  );
};
