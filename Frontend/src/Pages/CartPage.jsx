import { useContext, useEffect } from "react";
import { CartContext } from "../Contexts/CartContext";
import { useNavigate, useViewTransitionState } from "react-router-dom";

export default function Cart() {
  const { cartItems, setCartItems } = useContext(CartContext);
  const navigate = useNavigate();

  return (
    <>
      <div className="product-contanier">
        {!cartItems.length ? (
          <h1>Cart is Empty</h1>
        ) : (
          cartItems.map((product) => {
            return <ProductCard product={product} key={product.id} />;
          })
        )}
      </div>
      <button onClick={() => navigate("/home")}>Go to HomePage</button>
    </>
    // <pre>{JSON.stringify(cartItems, null, 2)}</pre>
  );
}

const ProductCard = ({ product }) => {
  const { cartItems, setCartItems } = useContext(CartContext);
  const { thumbnail, title } = product;

  return (
    <>
      <div className="product-card">
        <img
          className="product-image"
          src={thumbnail}
          alt="Can't load image!"
          loading="lazy"
        />
        <h4>{title}</h4>
      </div>
    </>
  );
};
