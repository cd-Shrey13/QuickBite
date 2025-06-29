import { useState, useCallback, useContext, createContext } from "react";

//Create cartContext
export const CartContext = createContext(null);

//
export default function CartContextProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const addItemToCart = useCallback((product) => {
    setCartItems((prev) => [...prev, { ...product }]);
  }, []);
  const contextValues = { cartItems, addItemToCart };

  return (
    <CartContext.Provider value={contextValues}>
      {children}
    </CartContext.Provider>
  );
}
