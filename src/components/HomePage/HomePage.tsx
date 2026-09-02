import { ProductsSlider } from '../../Product/ProductsSlider/ProductsSlider';

import { Link } from 'react-router-dom';
import { useFetchProducts } from '../../api/products';
import { Loader } from '../Loader/Loader';
import { PictureSlider } from '../../Product/PictureSlider/PictureSlider';

import './HomePage.scss';

export const HomePage = () => {
  //#region
  const { products, isLoading, errorMessage, refetch } = useFetchProducts();

  if (isLoading) return <Loader />;

  if (errorMessage)
    return (
      <div>
        <p>Oops, something went wrong</p>
        <button onClick={refetch}>Reload</button>
      </div>
    );

  const phones = products.filter(product => product.category === 'phones');
  const accessories = products.filter(
    product => product.category === 'accessories',
  );
  const tablets = products.filter(product => product.category === 'tablets');

  const withDiscount = [...products].filter(
    product => product.price !== product.fullPrice,
  ); //тут помилка, треба виправити

  const discountPrice = withDiscount.sort((a, b) => {
    const diffA = a.price - a.price; //тут треба буде змінити на інший масив і також на інший тип
    const diffB = b.price - b.price;
    return diffB - diffA;
  });

  const newestProduct = [...products].sort((a, b) => b.year - a.year);
  //не треба двічі стоврювати два окреми для знижки і новизни,
  // ти просто передаєш у компонент інший масив

  //#endregion
  return (
    <div className="homePage">
      <div className="homePage__container">
        {/* <h1>Product Catalog</h1> */}
        <h1 className="homePage__title">Welcome to Nice Gadgets store!</h1>

        <div className="homePage__pictureSlider">
          <PictureSlider />
        </div>

        <ProductsSlider title="Brand new models" products={newestProduct} />

        <h2 className="homePage__subtitle">Shop be category</h2>
        <div className="homePage__categories">
          <ul className="homePage__categories-list">
            <li className="homePage__categories-item">
              <Link className="homePage__category-card" to="/phones">
                <img
                  src="public\img\category-phones.webp"
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
              <Link className="homePage__category-card" to="/tablets">
                <img
                  src="public\img\category-tablets.webp"
                  alt="picture"
                  className="homePage__category-card-img"
                />
                <span className="homePage__category-card-title">Tablets</span>
                <span className="homePage__category-card__count">
                  {tablets.length} models
                </span>
              </Link>
            </li>
            <li className="homePage__categories-item">
              <Link className="homePage__category-card" to="/accessories">
                <img
                  src="public\img\category-accessories.webp"
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

        <ProductsSlider title="Hot prices" products={discountPrice} />
      </div>
    </div>
  );
};
