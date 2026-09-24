import { ProductsSlider } from '../../Product/ProductsSlider/ProductsSlider';

import { Link } from 'react-router-dom';
import { useFetchProducts } from '../../api/products';
import { Loader } from '../Loader/Loader';
import { PictureSlider } from '../../Product/PictureSlider/PictureSlider';

import './HomePage.scss';

export const HomePage = () => {
  //#region
  const { products, isLoading, errorMessage, refetch } =
    useFetchProducts();

  if (isLoading) {
    return <Loader />;
  }

  if (errorMessage) {
    {
      return (
        <div>
          <p>Oops, something went wrong</p>
          <button onClick={refetch}>Reload</button>
        </div>
      );
    }
  }

  const phones = products.filter(
    product => product.category === 'phones',
  );
  const accessories = products.filter(
    product => product.category === 'accessories',
  );
  const tablets = products.filter(
    product => product.category === 'tablets',
  );

  const withDiscount = [...products].filter(
    product => product.price !== product.fullPrice,
  );

  const discountPrice = withDiscount.sort((a, b) => {
    const diffA = a.price - a.price;
    const diffB = b.price - b.price;

    return diffB - diffA;
  });

  const newestProduct = [...products].sort(
    (a, b) => b.year - a.year,
  );

  //#endregion
  return (
    <div className="homePage">
      <div className="homePage__container">
        <h1 className="visually-hidden">Product Catalog</h1>
        <h2 className="homePage__heading ">
          Welcome to Nice Gadgets store!
        </h2>

        <div className="homePage__pictureSlider">
          <PictureSlider />
        </div>

        <ProductsSlider
          title="Brand new models"
          products={newestProduct}
        />

        <h2 className="homePage__subtitle">
          Shop be category
        </h2>
        <div className="homePage__categories">
          <ul className="homePage__categories-list">
            <li className="homePage__categories-item">
              <Link
                className="homePage__category-card"
                to="/phones"
              >
                <img
                  src={`${import.meta.env.BASE_URL}/img/category-phones.webp`}
                  alt="picture"
                  className="homePage__category-card-img"
                />
                <span className="homePage__category-card-title">
                  Mobile phones
                </span>
                <span className="homePage__category-card__count">
                  {phones.length} models
                </span>
              </Link>
            </li>
            <li className="homePage__categories-item">
              <Link
                className="homePage__category-card"
                to="/tablets"
              >
                <img
                  src={`${import.meta.env.BASE_URL}/img/category-tablets.webp`}
                  alt="picture"
                  className="homePage__category-card-img"
                />
                <span className="homePage__category-card-title">
                  Tablets
                </span>
                <span className="homePage__category-card__count">
                  {tablets.length} models
                </span>
              </Link>
            </li>
            <li className="homePage__categories-item">
              <Link
                className="homePage__category-card"
                to="/accessories"
              >
                <img
                  src={`${import.meta.env.BASE_URL}/img/category-accessories.webp`}
                  alt="picture"
                  className="homePage__category-card-img"
                />
                <span className="homePage__category-card-title">
                  Accessories
                </span>
                <span className="homePage__category-card__count">
                  {accessories.length} models
                </span>
              </Link>
            </li>
          </ul>
        </div>
        <ProductsSlider
          title="Hot prices"
          products={discountPrice}
        />
      </div>
    </div>
  );
};
