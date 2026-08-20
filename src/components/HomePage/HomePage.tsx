import { ProductsSlider } from '../../Product/ProductsSlider/ProductsSlider';

import { Link } from 'react-router-dom';
import { useFetchProducts } from '../../api/products';
import { Loader } from '../Loader/Loader';
import { PictureSlider } from '../../Product/PictureSlider/PictureSlider';

// import './HomePage.scss';

export const HomePage = () => {
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
    product => product.price !== product.price,
  );

  const discountPrice = withDiscount.sort((a, b) => {
    const diffA = a.price - a.price; //тут треба буде змінити на інший масив і також на інший тип
    const diffB = b.price - b.price;
    return diffB - diffA;
  });

  const newestProduct = [...products].sort((a, b) => b.year - a.year);
  //не треба двічі стоврювати два окреми для знижки і новизни,
  // ти просто передаєш у компонент інший масив

  return (
    <div className="homePage">
      <h1>Product Catalog</h1>
      <h2>Welcome to Nice Gadgets store!</h2>

      <div className="homePage__pictureSlider">
        <PictureSlider />
      </div>
      <div className="homePage__productSlider">
        <h4>Brand new models</h4>
        <ProductsSlider products={newestProduct} />
      </div>
      <div className="homePage__categories">
        <h2>Shop be category</h2>
        <Link to="/phones">
          <img src="" />
          Mobile phones
          {phones.length}
        </Link>
        <Link to="/tablets">
          <img src="" />
          Tablets
          {tablets.length}
        </Link>
        <Link to="/accessories">
          <img src="" />
          Accessories
          {accessories.length}
        </Link>
      </div>
      <div className="homePage__productSlider">
        <h3>Hot prices</h3>
        <ProductsSlider products={discountPrice} />
      </div>
    </div>
  );
};
//треба передати слайдери з відповідними масивами на свої місця тут, робити наступне
