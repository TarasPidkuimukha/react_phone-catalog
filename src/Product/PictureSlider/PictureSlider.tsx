import { useEffect, useState } from 'react';

export const PictureSlider = () => {
  const bannerImages = [
    'img/banner-accessories.png',
    'img/banner-phones.png',
    'img/banner-tablets.png',
  ];
  const [bunnerIndex, setBunnerIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setBunnerIndex(prev => (prev + 1) % bannerImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [bannerImages.length]);
  return (
    <div>
      <button
        onClick={() =>
          setBunnerIndex(
            (bunnerIndex - 1 + bannerImages.length) % bannerImages.length,
          )
        }
      >
        &lsaquo;
      </button>
      <div>
        <h3>Now available in our store</h3>
        <h4>Be the firts!</h4>
        <img src={bannerImages[bunnerIndex]} />
        <button>ORDER NOW</button>
      </div>
      <button
        onClick={() => setBunnerIndex((bunnerIndex + 1) % bannerImages.length)}
      >
        &rsaquo;
      </button>
    </div>
  );
};
