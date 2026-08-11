import { useEffect, useState } from 'react';
import { ProductsSlider } from '../../Product/ProductsSlider/ProductsSlider';
import { Footer } from '../Footer/Footer';
import { Link } from 'react-router-dom';
import { useFetchProducts } from '../../api/products';
import { Loader } from '../Loader/Loader';
import { PictureSlider } from '../../Product/PictureSlider/PictureSlider';

export const HomePage = () => {
  const { products, isLoading, errorMessage, refetch } = useFetchProducts();
  const [currentIndex, setCurrentIndex] = useState(0);

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
    product => product.price !== product.priceDiscount,
  );

  const discountPrice = withDiscount.sort((a, b) => {
    const diffA = a.price - a.priceDiscount;
    const diffB = b.price - b.priceDiscount;
    return diffB - diffA;
  });

  const newestProduct = [...products].sort((a, b) => b.year - a.year);
  //не треба двічі стоврювати два окреми для знижки і новизни,
  // ти просто передаєш у компонент інший масив

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % products.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [products]);

  return (
    <div>
      <h2>Welcome to Nice Gadgets store!</h2>

      <div>
        <PictureSlider />
      </div>
      <div>
        <h4>Brand new models</h4>
        <ProductsSlider products={newestProduct} />
      </div>
      <div>
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
      <div>
        <h3>Hot prices</h3>
        <ProductsSlider products={discountPrice} />
      </div>
      <Footer />
    </div>
  );
};
//треба передати слайдери з відповідними масивами на свої місця тут, робити наступне
