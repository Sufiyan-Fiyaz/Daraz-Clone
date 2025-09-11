import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../Components/CartContext.jsx";
import products from "../Components/ProductData.jsx";

const Navbar = () => {
  const [hovered, setHovered] = useState(null);
  const [showAppPopup, setShowAppPopup] = useState(false);
  const { cart } = useCart();
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

  const links = [
    "SAVE MORE ON APP",
    "SELL ON DARAZ",
    "HELP & SUPPORT",
    "LOGIN",
    "SIGN UP",
    "زبان تبدیل کریں",
  ];
  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.trim() !== "") {
      // lowercase match
      const filtered = products.filter((p) => {
        const title = p.title ? p.title.toLowerCase() : "";
        const desc = p.description ? p.description.toLowerCase() : "";
        return (
          title.includes(value.toLowerCase()) ||
          desc.includes(value.toLowerCase())
        );
      });

      if (filtered.length > 0) {
        setSuggestions(filtered.slice(0, 5)); // agar match mila
      } else {
        // agar match nahi mila to random products dikhao
        const shuffled = [...products].sort(() => 0.5 - Math.random());
        setSuggestions(shuffled.slice(0, 5));
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim() !== "") {
      navigate(`/search?q=${encodeURIComponent(query)}`);
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (product) => {
    navigate(`/product/${product.id}`);
    setQuery("");
    setSuggestions([]);
  };

  return (
    <div style={{ width: "100%", fontFamily: "Roboto, Arial, sans-serif" }}>
      {/* Top Bar */}
      <div
        style={{
          backgroundColor: "#f85606",
          fontSize: "12px",
          color: "white",
          padding: "9px 35px",
          display: "flex",
          justifyContent: "flex-end",
          gap: "16px",
          position: "relative",
        }}
      >
        {links.map((text, index) => (
          <a
            key={index}
            href="#"
            style={{
              textDecoration: "none",
              color: hovered === index ? "#ffe1d2" : "white",
              marginLeft: "20px",
              marginRight: text === "زبان تبدیل کریں" ? "20px" : "0",
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={() => setHovered(index)}
            onMouseLeave={() => setHovered(null)}
            onClick={(e) => {
              e.preventDefault();
              if (text === "SAVE MORE ON APP") {
                setShowAppPopup(!showAppPopup);
              }
            }}
          >
            {text}
          </a>
        ))}

        {/* App Popup */}
        {showAppPopup && (
          <div
            style={{
              position: "absolute",
              top: "35px",
              right: "430px",
              backgroundColor: "white",
              color: "#212121",
              padding: "20px",
              borderRadius: "4px",
              boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
              width: "280px",
              zIndex: 1000,
              animation: "slideDown 0.2s ease-out",
            }}
          >
            <div
              style={{
                fontSize: "14px",
                fontWeight: "500",
                color: "#212121",
                marginBottom: "15px",
                textAlign: "left",
              }}
            >
              Download Daraz App
            </div>

            <div
              style={{
                display: "flex",
                gap: "15px",
                alignItems: "flex-start",
              }}
            >
              <img
                src="https://gw.alicdn.com/imgextra/i2/O1CN01jHjmpl1pxcRVgFrYS_!!6000000005427-0-tps-150-150.jpg"
                alt="QR Code"
                style={{
                  width: "100px",
                  height: "100px",
                  border: "1px solid #f0f0f0",
                  borderRadius: "4px",
                }}
              />

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                  flex: 1,
                }}
              >
                <div
                  style={{
                    fontSize: "12px",
                    color: "#757575",
                    lineHeight: "1.4",
                  }}
                >
                  Scan with mobile
                </div>

                <a href="#" style={{ display: "block", width: "100%" }}>
                  <img
                    src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                    alt="App Store"
                    style={{
                      height: "32px",
                      width: "auto",
                      cursor: "pointer",
                    }}
                  />
                </a>

                <a href="#" style={{ display: "block", width: "100%" }}>
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                    alt="Google Play"
                    style={{
                      height: "38px",
                      width: "auto",
                      cursor: "pointer",
                    }}
                  />
                </a>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Main Orange Navbar */}
      <div
        style={{
          backgroundColor: "#f85606",
          padding: "15px 0",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "75px",
          position: "relative",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "1188px",
            display: "flex",
            alignItems: "center",
            padding: "0 20px",
            gap: "40px",
          }}
        >
          {/* Logo */}
          <Link to="/">
            <img
              src="https://lzd-img-global.slatic.net/us/domino/3b870cb043c7f8a9741cbf66329e294e.png"
              alt="Daraz"
              style={{ height: "35px", width: "auto", cursor: "pointer" }}
            />
          </Link>

          {/* Search + Cart */}
          <div
            style={{ position: "relative", width: "100%", maxWidth: "600px" }}
          >
            <form onSubmit={handleSearch} style={{ display: "flex" }}>
              <input
                type="text"
                placeholder="Search in Daraz"
                value={query}
                onChange={handleInputChange}
                style={{
                  flex: 1,
                  border: "none",
                  borderRadius: "4px 0 0 4px",
                  padding: "10px 16px",
                  outline: "none",
                  fontSize: "14px",
                  backgroundColor: "#fff",
                  color: "#424242",
                  height: "45px",
                  lineHeight: "45px",
                  boxSizing: "border-box",
                }}
              />
              <button
                type="submit"
                style={{
                  backgroundColor: "#ffe1d2",
                  border: "none",
                  borderRadius: "0 4px 4px 0",
                  padding: "0 18px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "45px",
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="none"
                  stroke="#f85606"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </button>
            </form>

            {/* Suggestion dropdown */}
            {suggestions.length > 0 && (
              <div
                style={{
                  position: "absolute",
                  top: "48px",
                  left: 0,
                  right: 0,
                  backgroundColor: "#fff",
                  border: "1px solid #ddd",
                  borderTop: "none",
                  zIndex: 1000,
                }}
              >
                {suggestions.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => handleSuggestionClick(product)}
                    style={{
                      padding: "10px",
                      cursor: "pointer",
                      borderBottom: "1px solid #f0f0f0",
                    }}
                  >
                    <strong>{product.title}</strong>
                    <div style={{ fontSize: "12px", color: "#777" }}>
                      {product.description.substring(0, 50)}...
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div>
            {/* Cart Icon - Navigate to Cart Page */}
            <Link
              to="/cart"
              style={{ marginLeft: "15px", position: "relative" }}
            >
              <svg
                width="30"
                height="30"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M4.51345 5H1.33325V3H6.15306L7.21972 8.33333H30.5315L27.5012 25H8.51345L4.51345 5ZM7.61972 10.3333L10.1531 23H25.832L28.135 10.3333H7.61972Z"
                  fill="white"
                ></path>
                <path
                  d="M11.9999 28C11.9999 28.7364 11.403 29.3333 10.6666 29.3333C9.93021 29.3333 9.33325 28.7364 9.33325 28C9.33325 27.2636 9.93021 26.6667 10.6666 26.6667C11.403 26.6667 11.9999 27.2636 11.9999 28Z"
                  fill="white"
                ></path>
                <path
                  d="M25.3333 29.3333C26.0696 29.3333 26.6666 28.7364 26.6666 28C26.6666 27.2636 26.0696 26.6667 25.3333 26.6667C24.5969 26.6667 23.9999 27.2636 23.9999 28C23.9999 28.7364 24.5969 29.3333 25.3333 29.3333Z"
                  fill="white"
                ></path>
              </svg>

              {/* Badge */}
              {cart.length > 0 && (
                <span
                  style={{
                    position: "absolute",
                    top: "-5px",
                    right: "-10px",
                    background: "white",
                    color: "orange",
                    fontSize: "12px",
                    fontWeight: "bold",
                    borderRadius: "50%",
                    padding: "3px 7px",
                  }}
                >
                  {cart.reduce((sum, item) => sum + item.quantity, 0)}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
