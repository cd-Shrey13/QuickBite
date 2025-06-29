import { memo, useCallback, useContext, useEffect, useState } from "react";
import "../App.css";
import { CartContext } from "../Contexts/CartContext";
import { useNavigate } from "react-router-dom";

const NUMBER_OF_PRODUCTS_ON_A_PAGE = 10;

function Pagination() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const start = currentPage * NUMBER_OF_PRODUCTS_ON_A_PAGE;
  const end = start + NUMBER_OF_PRODUCTS_ON_A_PAGE;
  const numberOfPages = Math.ceil(
    products.length / NUMBER_OF_PRODUCTS_ON_A_PAGE
  );

  const onClickHandler = (e) => {
    setCurrentPage(parseInt(e.target.textContent));
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const obj = await fetch("https://dummyjson.com/products?limit=90");
        const jsonObj = await obj.json();
        setProducts(jsonObj.products);
      } catch (error) {
        alert(error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="pagination-container">
        <div className="product-contanier">
          {!products.length ? (
            <h1>Loading...</h1>
          ) : (
            products.slice(start, end).map((product) => {
              return <ProductCard product={product} key={product.id} />;
            })
          )}
        </div>
        {/* <------------Buttons for Pagination--------------> */}
        <div className="page-button-container">
          {/* Left arrow button */}
          <button
            className="page-button"
            disabled={currentPage === 0}
            onClick={() => {
              setCurrentPage((prev) => prev - 1);
            }}
          >
            ⬅️
          </button>

          {/* buttons with Page numbers */}
          {numberOfPages &&
            [...Array(numberOfPages).keys()].map((page) => {
              return (
                <button
                  type="button"
                  key={page}
                  onClick={(e) => onClickHandler(e)}
                  className={
                    currentPage === page
                      ? "active-page page-button"
                      : "page-button"
                  }
                >
                  {page + 1}
                </button>
              );
            })}

          {/* Right arrow button */}
          <button
            className="page-button"
            disabled={currentPage === numberOfPages - 1}
            onClick={() => {
              setCurrentPage((prev) => prev + 1);
            }}
          >
            ➡️
          </button>
        </div>
        <button
          onClick={() => {
            navigate("/cart");
          }}
        >
          Go to Cart
        </button>
        {/* <------------Buttons for Pagination--------------> */}
      </div>
    </>
  );
}

const ProductCard = memo(({ product }) => {
  const { addItemToCart } = useContext(CartContext);
  const { thumbnail, title } = product;

  const addToCart = useCallback(() => {
    addItemToCart(product);
  }, [product]);
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
      <button type="button" onClick={addToCart}>
        Add to Cart
      </button>
    </>
  );
});

export default Pagination;
