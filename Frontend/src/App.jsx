import "./App.css";

import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Cart from "./Pages/CartPage";
import SignInPage from "./SignInPage";
import SignUpPage from "./SignUpPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<SignInPage />} />
        <Route path="/login" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </>
  );
}

export default App;
