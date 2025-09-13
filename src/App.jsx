import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import ProductDetail from "./Components/ProductDetail";
import Navbar from "./HeaderFooter/Menu";
import { CartProvider } from "./Components/CartContext.jsx";
import CartPage from "./Components/CartPage.jsx";
import SearchPage from "./Components/SearchPage.jsx";
import CheckoutPage from "./Components/CheckoutPage.jsx";
import ProceedToPayPage from "./Components/ProceedToPay.jsx";
import Signup from "./Components/Signup.jsx";
import Login from "./Components/Login.jsx";

// ✅ yaha se AuthProvider bhi import karo
import { AuthProvider } from "./Components/AuthContext.jsx";

function App() {
  return (
    <React.StrictMode>
      <AuthProvider>
        <CartProvider>
          <Router>
            <Navbar /> {/* ✅ Navbar global rakha */}
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/proceed-to-pay" element={<ProceedToPayPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </Routes>
          </Router>
        </CartProvider>
      </AuthProvider>
    </React.StrictMode>
  );
}

export default App;
