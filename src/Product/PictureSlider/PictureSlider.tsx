import { useEffect, useState } from 'react';
// import './PictureSlider.scss';

export const PictureSlider = () => {
  const bannerImages = [
    '/img/banner-accessories.png',
    '/img/banner-phones.png',
    '/img/banner-tablets.png',
  ];
  const [bunnerIndex, setBunnerIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setBunnerIndex(prev => (prev + 1) % bannerImages.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [bannerImages.length]);
  return (
    <div className="pictureSlider">
      <button
        className="pictureSlider__arrows"
        onClick={() =>
          setBunnerIndex(
            (bunnerIndex - 1 + bannerImages.length) % bannerImages.length,
          )
        }
      >
        &lsaquo;
      </button>
      <div className="pictureSlider__content">
        <h3 className="pictureSlider__title">Now available in our store</h3>
        <h4 className="pictureSlider__motto">Be the firts!</h4>
        <img src={bannerImages[bunnerIndex]} />
        <button className="pictureSlider__orderButton">ORDER NOW</button>
      </div>
      <button
        className="pictureSlider__arrows"
        onClick={() => setBunnerIndex((bunnerIndex + 1) % bannerImages.length)}
      >
        &rsaquo;
      </button>
    </div>
  );
};
