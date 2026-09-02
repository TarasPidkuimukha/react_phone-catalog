import { useNavigate, useParams } from 'react-router-dom';
import { useFetchProducts } from '../../api/products';
import { useFavorite } from '../../context/FavoriteContext';
import { useCart } from '../../context/CartContext';
import { ProductCard } from '../ProductCard/ProductCard';
import { Loader } from '../../components/Loader/Loader';
import { useState, useEffect } from 'react';
import { getProductsByCategory } from '../../api/fetching';
import { Product, ProductDetails } from '../../Types/types';

import './ProductDetailsPage.scss';

export const ProductDetailsPage = () => {
  //#region Logic
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
  //#endregion

  return (
    <div className="productDetails">
      <div className="productDetails__content">
        <div>
          <button
            className="productDetails__back"
            type="button"
            onClick={() => navigate(-1)}
          >
            <span>&lsaquo;</span>
            <span>Back</span>
          </button>
        </div>
        <h2 className="productDetails__title">{productWithDetails.name}</h2>

        <div className="productDetails__top">
          <div className="productDetails__images">
            {productWithDetails.images.map((image, index) => (
              // <img src="" alt="" />
              <button key={index}>{image}</button>
            ))}
          </div>

          <div className="productDetails__actions">
            <div className="productDetails__colors">
              <span className="productDetails__colors-title">
                Available colors
              </span>
              <div className="productDetails__colors-button">
                {productWithDetails.colorsAvailable.map((color, index) => (
                  <button
                    className="productDetails__btn"
                    type="button"
                    key={index}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
            <hr className="productDetails__divider" />
            <div className="productDetails__capacity">
              <span className="productDetails__capacity-title">
                Select capacity
              </span>
              <div className="productDetails__capacity-button">
                {productWithDetails.capacityAvailable.map((item, index) => (
                  <button type="button" key={index}>
                    {item}
                  </button>
                ))}
              </div>
            </div>
            <hr className="productDetails__divider" />
            <div className="productDetails__price">
              {productWithDetails.priceDiscount ===
              productWithDetails.priceRegular ? (
                <span className="productDetails__price--full">
                  ${productWithDetails.priceRegular}
                </span>
              ) : (
                <>
                  <span className="productDetails__price--discount">
                    ${productWithDetails.priceDiscount}
                  </span>
                  <span className="productDetails__price--full">
                    ${productWithDetails.priceRegular}
                  </span>
                </>
              )}
            </div>
            <div className="productDetails__buttons">
              {findAddedItem ? (
                <button
                  type="button"
                  className="productDetails__buttons--add--added"
                >
                  Added
                </button>
              ) : (
                <button
                  type="button"
                  className="productDetails__buttons--add"
                  onClick={() => addToCart(product)}
                >
                  Add to cart
                </button>
              )}
              {findFavItem ? (
                <button
                  type="button"
                  className="productDetails__buttons--heart"
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
                  className="productDetails__buttons--heart"
                  onClick={() => addToFavorite(product)}
                >
                  <img
                    src="img\Icons\unselected heart icon.svg"
                    alt="unselected heart button"
                  />
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="productDetails__info">
          <section className="productDetails__info-section">
            <span className="productDetails__info-section-title">Screen</span>
            <span className="productDetails__info-section-value">
              {productWithDetails.screen}
            </span>
          </section>
          <section className="productDetails__info-section">
            <span className="productDetails__info-section-title">
              Resolution
            </span>
            <span className="productDetails__info-section-value">
              {productWithDetails.resolution}
            </span>
          </section>

          <section className="productDetails__info-section">
            <span className="productDetails__info-section-title">
              Processor
            </span>
            <span className="productDetails__info-section-value">
              {productWithDetails.processor}
            </span>
          </section>
          <section className="productDetails__info-section">
            <span className="productDetails__info-section-title">RAM</span>
            <span className="productDetails__info-section-value">
              {productWithDetails.ram}
            </span>
          </section>
        </div>
        <div className="productDetails__decription">
          <h3 className="productDetails__subTitle">About</h3>
          <hr className="productDetails__divider" />
          {productWithDetails.description.map((item, index) => (
            <div className="productDetails__decription-info" key={index}>
              <h4 className="productDetails__decription-infoTitle">
                {item.title}
              </h4>
              <p className="productDetails__decription-infoText">{item.text}</p>
            </div>
          ))}
        </div>
        <div className="productDetails__productCard">
          <span className="productDetails__productCard-title">
            You may also like
          </span>
          <div className="productDetails__arrows">
            <button
              className="productDetails__arrow"
              type="button"
              onClick={() =>
                setCurrentIndex(
                  (currentIndex - 4 + recommended.length) % recommended.length,
                )
              }
            >
              &lsaquo;
            </button>
            <button
              className="productDetails__arrow"
              type="button"
              onClick={() =>
                setCurrentIndex((currentIndex + 4) % recommended.length)
              }
            >
              &rsaquo;
            </button>
          </div>
          <div className="productDetails__carts">
            {recommendShuf.map(product => (
              <ProductCard key={product.itemId} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
