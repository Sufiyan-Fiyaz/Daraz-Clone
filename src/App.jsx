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
import Signup from "./UserInfo/Signup.jsx";
import Login from "./UserInfo/Login.jsx";
import SellOnDaraz from "./Components/SellOnDaraz.jsx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ChatBox from "./HeaderFooter/ChatBox.jsx";

// ✅ yaha se AuthProvider bhi import karo
import { AuthProvider } from "./UserInfo/AuthContext.jsx";

function App() {
  return (
    <React.StrictMode>
      <AuthProvider>
        <CartProvider>
          <Router>
            <Navbar /> {/* ✅ Navbar global rakha */}
            <ChatBox />
            <ToastContainer position="top-right" autoClose={3000} />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/proceed-to-pay" element={<ProceedToPayPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/sell-on-daraz" element={<SellOnDaraz />} />
            </Routes>
          </Router>
        </CartProvider>
      </AuthProvider>
    </React.StrictMode>
  );
}

export default App;
