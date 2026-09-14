import { Product } from '../../Types/types';
import { ProductCard } from '../ProductCard/ProductCard';
import './ProductSlider.scss';
import { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';

interface ProductsSliderProps {
  products: Product[];
  title: string;
}

export const ProductsSlider: React.FC<ProductsSliderProps> = ({
  products,
  title,
}) => {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <div className="productSlider">
      <div className="productSlider__header">
        <h2 className="productSlider__title">{title}</h2>
        <div className="productSlider__buttons">
          <button
            className="productSlider__button"
            onClick={() => swiperRef.current?.slidePrev()}
          >
            &lsaquo;
          </button>
          <button
            className="productSlider__button"
            onClick={() => swiperRef.current?.slideNext()}
          >
            &rsaquo;
          </button>
        </div>
      </div>

      <Swiper
        className="productSlider__content"
        onSwiper={swiper => {
          swiperRef.current = swiper;
        }}
        modules={[Autoplay]}
        autoplay={{ delay: 9000 }}
        pagination={{ clickable: true }}
        slidesPerGroup={2}
        slidesPerView={1}
        spaceBetween={16}
        breakpoints={{
          768: {
            slidesPerView: 2,
            slidesPerGroup: 2,
          },
          1024: {
            slidesPerView: 3,
            slidesPerGroup: 3,
          },
          1200: {
            slidesPerView: 4,
            slidesPerGroup: 4,
          },
        }}
      >
        {products.map(product => (
          <SwiperSlide key={product.id}>
            <ProductCard product={product} title={''} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
