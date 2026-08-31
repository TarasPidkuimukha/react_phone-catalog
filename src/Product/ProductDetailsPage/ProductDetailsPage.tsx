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
  const [productWithDetails, setProductWithDetails] =
    useState<ProductDetails | null>(null);

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
      .then(products => {
        const currentProduct = products.find(
          product => product.id === productId,
        );
        setProductWithDetails(currentProduct || null);
      })
      .catch(() => setErrorMes('Unable to load products'))
      .finally(() => {
        setIsLoad(false);
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

  // const sortedById = productsCategory.find(item => {
  //   return item.id === productId;
  // });

  if (!productWithDetails)
    return (
      <div>
        <p>No product found</p>
      </div>
    );

  const product: Product = {
    category: productWithDetails.category,
    itemId: productWithDetails.id,
    name: productWithDetails.name,
    fullPrice: productWithDetails.priceRegular,
    price: productWithDetails.priceDiscount,
    capacity: productWithDetails.capacity,
    color: productWithDetails.color,
    ram: productWithDetails.ram,
    screen: productWithDetails.screen,
    image: productWithDetails.images[0],
    year: 0,
  };

  const findAddedItem = cart.some(
    item => item.product.itemId === productWithDetails.id,
  );
  const findFavItem = favorites.some(
    item => item.product.itemId === productWithDetails.id,
  );
  const shuffled = () => {
    const filtered = [...products].filter(
      product => product.itemId !== productWithDetails.id,
    );

    for (let i = filtered.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [filtered[i], filtered[j]] = [filtered[j], filtered[i]];
    }
    return filtered.slice(0, 8);
  };
  const recommended = shuffled();

  const recommendShuf = recommended.slice(currentIndex, currentIndex + 4);

  // const product = products.find(
  //   product => product.itemId === productWithDetails.id,
  // );

  return (
    <div className="productDetails">
      <div className="productDetails__content">
        <button onClick={() => navigate(-1)}>Back</button>
        <h2>{productWithDetails.name}</h2>
        <div className="productDetails__images">
          {productWithDetails.images.map((image, index) => (
            <button key={index}>{image}</button>
          ))}
        </div>
        <span className="productDetails__colors">
          Available colors
          {productWithDetails.colorsAvailable.map((color, index) => (
            <button key={index}>{color}</button>
          ))}
        </span>
        <p className="productDetails__capacity">
          Select capacity
          {productWithDetails.capacityAvailable.map((item, index) => (
            <button key={index}>{item}</button>
          ))}
        </p>
        <div className="productDetails__price">
          {productWithDetails.priceDiscount ===
          productWithDetails.priceRegular ? (
            <p>${productWithDetails.priceRegular}</p>
          ) : (
            <div>
              <p>${productWithDetails.priceDiscount}</p>
              <p>${productWithDetails.priceRegular}</p>
            </div>
          )}
        </div>

        {findAddedItem ? (
          <button type="button" className="productCard__button--add--added">
            Added
          </button>
        ) : (
          <button
            type="button"
            className="productCard__button--add"
            onClick={() => addToCart(product)}
          >
            Add to cart
          </button>
        )}
        {findFavItem ? (
          <button
            type="button"
            className="productCard__button--heart"
            onClick={() => removeFromFavorite(product)}
          >
            <img
              src="img\Icons\selected heart icon.svg"
              alt="selected heart button"
            />
          </button>
        ) : (
          <button
            type="button"
            className="productCard__button--heart"
            onClick={() => addToFavorite(product)}
          >
            <img
              src="img\Icons\unselected heart icon.svg"
              alt="unselected heart button"
            />
          </button>
        )}
        <div className="productDetails__info">
          <span>
            <p className="productDetails__text">Screen</p>
            <p className="productDetails__text">{productWithDetails.screen}</p>
          </span>
          <span>
            <p>Resolution {productWithDetails.resolution}</p>
          </span>

          <span>
            <p className="productDetails__text">Processor</p>
            <p className="productDetails__value">
              {productWithDetails.processor}
            </p>
          </span>
          <span>
            <p className="productDetails__text">RAM</p>
            <p className="productDetails__value">{productWithDetails.ram}</p>
          </span>
        </div>
        <div className="productDetails__decription">
          <h3 className="productDetails__decription--subTitle">About</h3>
          {productWithDetails.description.map((item, index) => (
            <div className="productDetails__decription--info" key={index}>
              <h4 className="productDetails__decription--infoTitle">
                {item.title}
              </h4>
              <p className="productDetails__decription--infoText">
                {item.text}
              </p>
            </div>
          ))}
          <div className="productDetails__productCard">
            {recommendShuf.map(product => (
              <ProductCard
                title="You may also like"
                key={product.itemId}
                product={product}
              />
            ))}

            <button
              type="button"
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
              type="button"
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
    </div>
  );
};
