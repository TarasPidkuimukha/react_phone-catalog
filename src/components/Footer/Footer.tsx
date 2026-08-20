// import './Footer.scss';

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  return (
    <footer>
      <div>
        <div className="footer">
          <a href="" className="footer__logo">
            <img src="" alt="" />
          </a>
          <a className="footer__link" href="https://github.com">
            GITHUB
          </a>
          <a className="footer__link" href="">
            CONTACTS
          </a>
          <a className="footer__link" href="">
            RIGHTS
          </a>
          <button className="footer__button" onClick={() => scrollToTop()}>
            <span>Back to top</span>
            <img src="" />
          </button>
        </div>
      </div>
    </footer>
  );
};
