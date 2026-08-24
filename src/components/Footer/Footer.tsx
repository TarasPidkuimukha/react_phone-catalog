import { Link } from 'react-router-dom';
import './Footer.scss';

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  return (
    <footer className="footer">
      <div className="footer__container">
        <Link to="/" className="footer__logo">
          <img
            src="public\img\Icons\Logo.svg"
            alt="logo"
            className="footer__logo-icon"
          />
        </Link>
        <ul className="footer__list">
          <li>
            <a className="footer__link" href="https://github.com">
              GITHUB
            </a>
          </li>
          <li>
            <a className="footer__link" href="">
              CONTACTS
            </a>
          </li>
          <li>
            <a className="footer__link" href="">
              RIGHTS
            </a>
          </li>
        </ul>
        <div className="footer__back-to-top">
          <span className="footer__back-text">Back to top</span>
          <button
            type="button"
            className="footer__arrow-btn chevron-up"
            onClick={() => scrollToTop()}
          >
            &lsaquo;
          </button>
        </div>
      </div>
    </footer>
  );
};
