import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Home from "./Components/Home";
import ProductDetail from "./Components/ProductDetail";
import Navbar from "./HeaderFooter/Menu";
import { CartProvider } from "./Cart/CartContext.jsx";
import CartPage from "./Cart/CartPage.jsx";
import SearchPage from "./Components/SearchPage.jsx";
import CheckoutPage from "./Checkouts/CheckoutPage.jsx";
import ProceedToPayPage from "./Checkouts/ProceedToPay.jsx";
import PaymentMethods from "./Checkouts/PaymentMethods.jsx";
import Signup from "./UserInfo/Signup.jsx";
import Login from "./UserInfo/Login.jsx";
import SellOnDaraz from "./Seller/SellOnDaraz.jsx";
import SellerLogin from "./Seller/SellerLogin.jsx";
import ProductForm from "./Seller/SellerDashboard.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ChatBox from "./HeaderFooter/ChatBox.jsx";
import { AuthProvider } from "./UserInfo/AuthContext.jsx";
import SellerMenu from "./Seller/SellerMenu.jsx"; // ✅ import seller menu

// Wrapper component to handle conditional menu
const AppContent = () => {
  const location = useLocation();

  // Check if current route is a seller route
  const isSellerRoute = location.pathname.startsWith("/seller");

  // Optional: hide menu completely on seller login page
  const showMenu = location.pathname !== "/sellerlogin";

  return (
    <>
      {showMenu && (isSellerRoute ? <SellerMenu /> : <Navbar />)}
      <ChatBox />
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        {/* Customer Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/proceed-to-pay" element={<ProceedToPayPage />} />
        <Route path="/payment-methods" element={<PaymentMethods />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/sell-on-daraz" element={<SellOnDaraz />} />

        {/* Seller Routes */}
        <Route path="/sellerlogin" element={<SellerLogin />} />
        <Route path="/sellerdashboard" element={<ProductForm />} />
        <Route path="/seller/orders" element={<h1>Seller Orders</h1>} />
        <Route path="/seller/products" element={<h1>Seller Products</h1>} />
      </Routes>
    </>
  );
};

function App() {
  return (
    <React.StrictMode>
      <AuthProvider>
        <CartProvider>
          <Router>
            <AppContent />
          </Router>
        </CartProvider>
      </AuthProvider>
    </React.StrictMode>
  );
}

export default App;
