import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../Cart/CartContext.jsx";
import axios from "axios";

const Navbar = () => {
  const [hovered, setHovered] = useState(null);
  const [showAppPopup, setShowAppPopup] = useState(false);
  const [showHelpPopup, setShowHelpPopup] = useState(false);
  const [showLanguagePopup, setShowLanguagePopup] = useState(false);
  const { cart } = useCart();
  const { clearCart } = useCart();
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [userName, setUserName] = useState("");

  const navigate = useNavigate();

  
  // ✅ Refs for outside click
  const appPopupRef = useRef(null);
  const helpPopupRef = useRef(null);
  const languagePopupRef = useRef(null);


const [products, setProducts] = useState([]);
const [loading, setLoading] = useState(true);

const fetchProducts = async () => {
  try {
    const res = await axios.get("https://localhost:7292/api/Products");

    let data = res.data;

    // agar API nested $values return kare
    if (data.$values) {
      data = data.$values;
    }

    // ensure hamesha array ho
    setProducts(Array.isArray(data) ? data : []);
  } catch (err) {
    console.error("Error fetching products:", err);
  } finally {
    setLoading(false);
  }
};



  useEffect(() => {
    const handleClickOutside = (event) => {
      // App Popup
      if (
        showAppPopup &&
        appPopupRef.current &&
        !appPopupRef.current.contains(event.target)
      ) {
        setShowAppPopup(false);
      }

      // Help Popup
      if (
        showHelpPopup &&
        helpPopupRef.current &&
        !helpPopupRef.current.contains(event.target)
      ) {
        setShowHelpPopup(false);
      }

      // Language Popup
      if (
        showLanguagePopup &&
        languagePopupRef.current &&
        !languagePopupRef.current.contains(event.target)
      ) {
        setShowLanguagePopup(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showAppPopup, showHelpPopup, showLanguagePopup]);

  useEffect(() => {
    const storedName = localStorage.getItem("userName");
    if (storedName) {
      setUserName(storedName);
    } else {
      const userId = localStorage.getItem("userId");
      if (userId) {
        axios
          .get(`https://localhost:7292/api/Users/${userId}`)
          .then((res) => {
            if (res.data && res.data.fullName) {
              setUserName(res.data.fullName);
              localStorage.setItem("userName", res.data.fullName);
            }
          })
          .catch((err) => console.error("API error:", err));
      }
    }

    const handleUserLogin = () => {
      const updatedName = localStorage.getItem("userName");
      setUserName(updatedName || "");
    };

    window.addEventListener("userLogin", handleUserLogin);
    return () => {
      window.removeEventListener("userLogin", handleUserLogin);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    setUserName("");
    window.dispatchEvent(new Event("userLogin"));

    clearCart(); // pass empty array if your function needs it
    navigate("/");
  };

  const links = [
    "SAVE MORE ON APP",
    "SELL ON DARAZ",
    "HELP & SUPPORT",
    userName ? `${userName} Account` : "LOGIN",
    !userName ? "SIGN UP" : null,
    "زبان تبدیل کریں",
  ].filter(Boolean);

const handleInputChange = async (e) => {
  const value = e.target.value;
  setQuery(value);

  if (value.trim() !== "") {
    try {
      const res = await axios.get(`https://localhost:7292/api/Product/search?query=${value}`);

      console.log("API response:", res.data);

      let results = [];

      if (Array.isArray(res.data)) {
        results = res.data;  // agar directly array hai
      } else if (res.data && Array.isArray(res.data.$values)) {
        results = res.data.$values; // agar $values wala array hai (EF Core ka case)
      } else if (res.data && Array.isArray(res.data.data)) {
        results = res.data.data; // agar object ke andar "data" hai
      }

      const filtered = results.filter((p) => {
        const title = p.title ? p.title.toLowerCase() : "";
        const desc = p.description ? p.description.toLowerCase() : "";
        return (
          title.includes(value.toLowerCase()) ||
          desc.includes(value.toLowerCase())
        );
      });

      setSuggestions(filtered.slice(0, 5));
    } catch (error) {
      console.error("Error fetching suggestions:", error);
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
                setShowHelpPopup(false);
              } else if (text === "SELL ON DARAZ") {
                navigate("/sell-on-daraz");
              } else if (text === "HELP & SUPPORT") {
                setShowHelpPopup(!showHelpPopup);
                setShowAppPopup(false);
              } else if (text === "LOGIN") {
                navigate("/login");
              } else if (text === "SIGN UP") {
                navigate("/signup");
              } else if (text === "زبان تبدیل کریں") {
                setShowLanguagePopup(!showLanguagePopup); // ✅ open popup
              }
            }}
          >
            {text}
          </a>
        ))}

        {/* Logout Button */}
        {userName && (
          <button
            onClick={handleLogout}
            style={{
              marginLeft: "10px",
              background: "transparent",
              border: "1px solid white",
              color: "white",
              cursor: "pointer",
              fontSize: "12px",
              padding: "2px 6px",
            }}
          >
            Logout
          </button>
        )}

        {/* App Popup */}
        {showAppPopup && (
          <div
            ref={appPopupRef}
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
              style={{ display: "flex", gap: "15px", alignItems: "flex-start" }}
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
                    style={{ height: "32px", width: "auto", cursor: "pointer" }}
                  />
                </a>
                <a href="#" style={{ display: "block", width: "100%" }}>
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                    alt="Google Play"
                    style={{ height: "38px", width: "auto", cursor: "pointer" }}
                  />
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Help & Support Popup */}
        {showHelpPopup && (
          <>
            <style jsx>{`
              @keyframes slideDown {
                from {
                  opacity: 0;
                  transform: translateY(-10px);
                }
                to {
                  opacity: 1;
                  transform: translateY(0);
                }
              }

              .help-popup {
                position: absolute;
                top: 35px;
                right: 290px;
                background-color: white;
                color: #212121;
                padding: 8px 0;
                border-radius: 8px;
                box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
                width: 240px;
                z-index: 1000;
                animation: slideDown 0.3s ease-out;
                border: 1px solid #e0e0e0;
                overflow: hidden;
              }

              .help-item {
                padding: 12px 20px;
                font-size: 14px;
                cursor: pointer;
                color: #424242;
                position: relative;
                transition: all 0.2s ease;
                font-weight: 400;
                border-bottom: 1px solid #f5f5f5;
              }

              .help-item:last-child {
                border-bottom: none;
              }

              .help-item:hover {
                background-color: #fff;
                color: #ff6801;
                padding-left: 24px;
              }

              .help-item::after {
                content: "";
                position: absolute;
                bottom: 0;
                left: 20px;
                right: 20px;
                height: 2px;
                background-color: #ff6801;
                transform: scaleX(0);
                transform-origin: left;
                transition: transform 0.3s ease;
              }

              .help-item:hover::after {
                transform: scaleX(1);
              }

              .help-item:last-child::after {
                display: none;
              }
            `}</style>

            <div ref={helpPopupRef} className="help-popup">
              {[
                "Help Center",
                "Contact Customer Care",
                "Order",
                "Shipping & Delivery",
                "Payment",
                "Returns & Refunds",
              ].map((item, i) => (
                <div
                  key={i}
                  className="help-item"
                  onClick={() => {
                    setShowHelpPopup(false);
                    alert(`${item} clicked`);
                  }}
                >
                  {item}
                </div>
              ))}
            </div>
          </>
        )}
        {showLanguagePopup && (
          <div
            ref={languagePopupRef}
            style={{
              position: "absolute",
              top: "35px",
              right: "15px",
              backgroundColor: "white",
              border: "1px solid #e0e0e0",
              borderRadius: "4px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
              width: "220px",
              zIndex: 1000,
              display: "flex", // ✅ row layout
              justifyContent: "space-between",
              padding: "10px 15px",
            }}
          >
            {/* Urdu Option */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
                fontSize: "13px",
                color: "#333",
              }}
              onClick={() => setShowLanguagePopup(false)}
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Flag_of_Pakistan.svg/250px-Flag_of_Pakistan.svg.png"
                alt="Pakistan Flag"
                style={{
                  width: "20px",
                  height: "14px",
                  objectFit: "cover",
                  marginRight: "8px",
                }}
              />
              <span
                style={{ marginRight: "4px", fontSize: "12px", color: "#666" }}
              >
                UR /
              </span>
              <span style={{ fontSize: "13px", color: "#333" }}>Urdu</span>
            </div>

            {/* English Option */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
                fontSize: "13px",
                color: "#333",
              }}
              onClick={() => setShowLanguagePopup(false)}
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/f/f2/Flag_of_Great_Britain_%281707%E2%80%931800%29.svg"
                alt="UK Flag"
                style={{
                  width: "20px",
                  height: "14px",
                  objectFit: "cover",
                  marginRight: "8px",
                }}
              />
              <span
                style={{ marginRight: "4px", fontSize: "12px", color: "#666" }}
              >
                EN /
              </span>
              <span style={{ fontSize: "13px", color: "#333" }}>English</span>
              <div
                style={{
                  marginLeft: "6px",
                  color: "#4CAF50",
                  fontSize: "16px",
                }}
              >
                ✓
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
            {/* Cart Icon */}
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
