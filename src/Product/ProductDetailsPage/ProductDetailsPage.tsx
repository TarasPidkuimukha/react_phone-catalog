import { useNavigate, useParams } from 'react-router-dom';
import { useFetchProducts } from '../../api/products';
import { useFavorite } from '../../context/FavoriteContext';
import { useCart } from '../../context/CartContext';
import { ProductCard } from '../ProductCard/ProductCard';
import { Loader } from '../../components/Loader/Loader';
import { useState, useEffect } from 'react';
import { getProductsByCategory } from '../../api/fetching';
import { Product, ProductDetails } from '../../Types/types';

// import './ProductDetailsPage.scss';

export const ProductDetailsPage = () => {
  const [productsWithDetails, setProductsCategory] =
    useState<ProductDetails>(null);

  const [isLoad, setIsLoad] = useState(false);
  const [errorMes, setErrorMes] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  const { products, isLoading, errorMessage, refetch } = useFetchProducts();
  const { productId, category } = useParams();
  const { cart, addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    setErrorMes('');
    setIsLoad(true);

    if (
      category !== 'phones' &&
      category !== 'tablets' &&
      category !== 'accessories'
    )
      return;

    getProductsByCategory(category)
      .then(setProductsCategory)
      .catch(() => setErrorMes('Unable to load products'))
      .finally(() => {
        setIsLoad(false);
        console.log(category);
      });
  }, [productId, category]);

  const { favorites, addToFavorite, removeFromFavorite } = useFavorite();
  if (isLoading || isLoad) return <Loader />;

  if (errorMessage || errorMes)
    return (
      <div>
        <p>Oops, something went wrong</p>
        <button onClick={refetch}>Reload</button>
      </div>
    );

  const sortedById = productsCategory.find(item => {
    return item.id === productId;
  });

  if (!sortedById)
    return (
      <div>
        <p>No product found</p>
      </div>
    );

  const findAddedItem = cart.some(item => item.product.id === sortedById.id);
  const findFavItem = favorites.some(item => item.product.id === sortedById.id);
  const shuffled = () => {
    const filtered = [...products].filter(
      product => product.id !== sortedById.id,
    );

    for (let i = filtered.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [filtered[i], filtered[j]] = [filtered[j], filtered[i]];
    }
    return filtered.slice(0, 8);
  };
  const recommended = shuffled();

  const recommendShuf = recommended.slice(currentIndex, currentIndex + 4);

  return (
    <div className="productDetails">
      <button onClick={() => navigate(-1)}>Back</button>
      <h2>{sortedById.name}</h2>
      <div className="productDetails__images">
        {sortedById.images.map((image, index) => (
          <button key={index}>{image}</button>
        ))}
      </div>
      <span className="productDetails__colors">
        Available colors
        {sortedById.colorsAvailable.map((color, index) => (
          <button key={index}>{color}</button>
        ))}
      </span>
      <p className="productDetails__capacity">
        Select capacity
        {sortedById.capacityAvailable.map((item, index) => (
          <button key={index}>{item}</button>
        ))}
      </p>
      <div className="productDetails__price">
        {sortedById.priceDiscount === sortedById.priceRegular ? (
          <p>${sortedById.priceRegular}</p>
        ) : (
          <div>
            <p>${sortedById.priceDiscount}</p>
            <p>${sortedById.priceRegular}</p>
          </div>
        )}
      </div>

      {findAddedItem ? (
        <button className="productDetails__addedButton">Added to cart</button>
      ) : (
        <button
          className="productDetails__addingButton"
          onClick={() => addToCart(sortedById)}
        >
          Add to cart
        </button>
      )}
      {findFavItem ? (
        <button
          className="productDetails__favAdded"
          onClick={() => removeFromFavorite(sortedById)}
        >
          <img src="" alt="selected heart button" />
        </button>
      ) : (
        <button
          className="productDetails__favAdding"
          onClick={() => addToFavorite(sortedById)}
        >
          <img src="" alt="unselected heart button" />
        </button>
      )}
      <div className="productDetails__info">
        <span>
          <p className="productDetails__text">Screen</p>
          <p className="productDetails__value">{sortedById.screen}</p>
        </span>
        <span>
          <p>Resolution {sortedById.resolution}</p>
        </span>

        <span>
          <p className="productDetails__text">Processor</p>
          <p className="productDetails__value">{sortedById.processor}</p>
        </span>
        <span>
          <p className="productDetails__text">RAM</p>
          <p className="productDetails__value">{sortedById.ram}</p>
        </span>
      </div>
      <div className="productDetails__decription">
        <h3 className="productDetails__decription--subTitle">About</h3>
        {sortedById.description.map((item, index) => (
          <div className="productDetails__decription--info" key={index}>
            <h4 className="productDetails__decription--infoTitle">
              {item.title}
            </h4>
            <p className="productDetails__decription--infoText">{item.text}</p>
          </div>
        ))}
        <div className="productDetails__extraProducts">
          <h3 className="productDetails__extraProducts--title">
            You may also like
          </h3>
          {recommendShuf.map(product => (
            <div className="productDetails__extraProducts--content">
              <ProductCard key={product.id} product={product} />
            </div>
          ))}

          <button
            className="productDetails__extraProducts--buttons"
            onClick={() =>
              setCurrentIndex(
                (currentIndex - 4 + recommended.length) % recommended.length,
              )
            }
          >
            &lsaquo;
          </button>
          <button
            className="productDetails__extraProducts--buttons"
            onClick={() =>
              setCurrentIndex((currentIndex + 4) % recommended.length)
            }
          >
            &rsaquo;
          </button>
        </div>
      </div>
    </div>
  );
};
