import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import ProductDetail from "./Components/ProductDetail";
import Navbar from "./HeaderFooter/Menu";
import { CartProvider } from "./Components/CartContext.jsx";
import CartPage from "./Components/CartPage.jsx";
import SearchPage from "./Components/SearchPage.jsx";
import CheckoutPage from "./Components/CheckoutPage.jsx";
// ✅ import kiya

function App() {
  return (
    <React.StrictMode>
      <CartProvider>
        <Router>
          <Navbar /> {/* ✅ Navbar global rakha */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
          </Routes>
        </Router>
      </CartProvider>
    </React.StrictMode>
  );
}

export default App;
