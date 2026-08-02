import { useState } from 'react';

export const Cart = ({}) => {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  const [isAdded, setIsAdded] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const [productId, setProductId] = useState(0);
  const [isSelected, setIsSelected] = useState(false);

  return (
    <div>
      <div>
        <button>
          <p>Back</p>
          <a href="" />
        </button>
        <h2>Cart</h2>
        <div>
          {products.map(product => (
            <div key={product.id}>
              <button>x</button>
              <img src="" />
              <p>{product.name}</p>

              <div>
                <button>
                  <span>{amount}</span>
                  <img src="" />
                </button>
                <button>
                  <span>{product.price}</span>
                  <img src="" />
                </button>
              </div>
            </div>
          ))}
          <div>
            <h3>{$`amount`}</h3>
            <p>Total for {`{number}`}items</p>
            <button>Checkout </button>
          </div>
        </div>
      </div>
    </div>
  );
};
