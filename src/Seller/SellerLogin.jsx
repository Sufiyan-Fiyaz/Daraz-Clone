import React, { useState } from "react";
import SellerMenu from "./SellerMenu";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
 import axios from "axios";

const SellerLogin = () => {
  const [credentials, setCredentials] = useState({
    emailOrPhone: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");  // ✅ add this
  const navigate = useNavigate();


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
  };



const handleLogin = async (e) => {
  e.preventDefault();
  setError("");

  if (!credentials.emailOrPhone || !credentials.password) {
    setError("Please enter email or phone and password");
    return;
  }

  try {
    const res = await axios.post("https://localhost:7292/api/Users/login", {
      identifier: credentials.emailOrPhone,
      password: credentials.password,
    });

    // ❌ role check hata diya
    if (res.data.token) {
      localStorage.setItem("token", res.data.token);
    }

    localStorage.setItem("userId", res.data.id);
    localStorage.setItem("userName", res.data.fullName);

    toast.success(res.data.message || "Login successful!");

    window.dispatchEvent(new Event("userLogin"));

    // Clear form
    setCredentials({ emailOrPhone: "", password: "" });
    setError("");

    // ✅ ab chahe seller ho ya user, dashboard navigate karo
    navigate("/sellerdashboard"); 
  } catch (err) {
    if (err.response && err.response.data) {
      toast.error(err.response.data.message || "Invalid credentials");
    } else {
      toast.error("Network error. Please try again.");
    }
  }
};



  const mainContainerStyle = {
    minHeight: "100vh",
    backgroundImage:
      "url('https://gw.alicdn.com/imgextra/i2/O1CN01a2rB6S1CUW2cW1UoU_!!6000000000084-2-tps-2880-1248.png')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed", // ✅ stays fixed while scrolling
    display: "flex",
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    margin: 0,
    padding: 0,
  };

  const leftSectionStyle = {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    padding: "40px 80px",
    color: "white",
    position: "relative",
  };

  const rightSectionStyle = {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "40px",
  };

  const headerStyle = {
    position: "absolute",
    top: "20px",
    left: "20px",
    display: "flex",
    alignItems: "center",
    zIndex: 10,
  };

  const logoStyle = {
    width: "32px",
    height: "32px",
    marginRight: "8px",
  };

  const logoTextStyle = {
    fontSize: "16px",
    fontWeight: "600",
    color: "white",
    lineHeight: "1.2",
  };

  const titleStyle = {
    fontSize: "48px",
    fontWeight: "700",
    lineHeight: "1.1",
    marginBottom: "16px",
    textShadow: "0 2px 4px rgba(0,0,0,0.1)",
    marginTop: "60px",
  };

  const subtitleStyle = {
    fontSize: "16px",
    fontWeight: "400",
    lineHeight: "1.5",
    maxWidth: "380px",
    opacity: 0.95,
  };

  const loginCardStyle = {
    backgroundColor: "white",
    borderRadius: "12px",
    padding: "32px",
    width: "100%",
    maxWidth: "380px",
    boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
    position: "relative",
  };

  const cardTitleStyle = {
    fontSize: "20px",
    fontWeight: "600",
    color: "#333",
    marginBottom: "24px",
    textAlign: "left",
  };

  const inputGroupStyle = {
    marginBottom: "16px",
    position: "relative",
  };

  const inputStyle = {
    width: "100%",
    padding: "12px 16px",
    border: "1px solid #ddd",
    borderRadius: "6px",
    fontSize: "14px",
    outline: "none",
    transition: "border-color 0.2s ease, box-shadow 0.2s ease",
    boxSizing: "border-box",
    backgroundColor: "#fff",
    color: "#333",
  };

  const inputFocusStyle = {
    borderColor: "#ff6b35",
    boxShadow: "0 0 0 2px rgba(255, 107, 53, 0.1)",
  };

  const passwordToggleStyle = {
    position: "absolute",
    right: "12px",
    top: "50%",
    transform: "translateY(-50%)",
    background: "none",
    border: "none",
    cursor: "pointer",
    color: "#999",
    fontSize: "16px",
    padding: "0",
  };

  const loginButtonStyle = {
    width: "100%",
    padding: "12px",
    backgroundColor: "#ff6b35",
    color: "white",
    border: "none",
    borderRadius: "6px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "background-color 0.2s ease, transform 0.1s ease",
    marginBottom: "16px",
    marginTop: "8px",
  };

  const termsTextStyle = {
    fontSize: "11px",
    color: "#666",
    lineHeight: "1.4",
    marginBottom: "12px",
    textAlign: "left",
  };

  const linkStyle = {
    color: "#ff6b35",
    textDecoration: "none",
    fontWeight: "500",
  };

  const forgotPasswordStyle = {
    textAlign: "right",
    marginBottom: "16px",
  };

  const forgotLinkStyle = {
    ...linkStyle,
    fontSize: "12px",
  };

  const registerSectionStyle = {
    textAlign: "center",
    fontSize: "12px",
    color: "#666",
    marginBottom: "12px",
  };

  const globalSellerStyle = {
    textAlign: "center",
    fontSize: "12px",
  };

  const illustrationStyle = {
    position: "absolute",
    bottom: "40px",
    left: "80px",
    opacity: 0.3,
  };

  return (
    <div style={mainContainerStyle}>
      <SellerMenu />
      {/* Left Section */}
      <div style={leftSectionStyle}>
        <h1 style={titleStyle}>
          Become A Daraz Seller
          <br />
          Today!
        </h1>
        <p style={subtitleStyle}>
          Create a Daraz seller account now and reach millions of customers!
        </p>

        {/* Illustration */}
        <div style={illustrationStyle}>
          <svg width="200" height="120" viewBox="0 0 200 120" fill="none">
            <ellipse
              cx="40"
              cy="100"
              rx="30"
              ry="8"
              fill="rgba(255,255,255,0.2)"
            />
            <circle cx="40" cy="90" r="12" fill="rgba(255,255,255,0.3)" />
            <rect
              x="80"
              y="70"
              width="80"
              height="40"
              rx="8"
              fill="rgba(255,255,255,0.3)"
            />
            <circle cx="170" cy="60" r="8" fill="rgba(255,255,255,0.4)" />
            <path
              d="M100 40 L120 60 L140 35 L160 55"
              stroke="rgba(255,255,255,0.4)"
              strokeWidth="2"
              fill="none"
            />
          </svg>
        </div>
      </div>

      {/* Right Section - Login Form */}
      <div style={rightSectionStyle}>
        <div style={loginCardStyle}>
          <h2 style={cardTitleStyle}>Login with Password</h2>

          <div style={inputGroupStyle}>
            <input
              type="text"
              name="emailOrPhone"
              placeholder="Mobile Number/ Email"
              value={credentials.emailOrPhone}
              onChange={handleInputChange}
              style={inputStyle}
              onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
              onBlur={(e) => Object.assign(e.target.style, inputStyle)}
            />
          </div>

          <div style={inputGroupStyle}>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={credentials.password}
              onChange={handleInputChange}
              style={inputStyle}
              onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
              onBlur={(e) => Object.assign(e.target.style, inputStyle)}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={passwordToggleStyle}
            >
              {showPassword ? "🙈" : "👁"}
            </button>
          </div>

          <button
            onClick={handleLogin}
            style={loginButtonStyle}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = "#e55a2b";
              e.target.style.transform = "translateY(-1px)";
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = "#ff6b35";
              e.target.style.transform = "translateY(0)";
            }}
          >
            Login
          </button>

          <div style={termsTextStyle}>
            By clicking Login, you agree to these{" "}
            <a href="#" style={linkStyle}>
              Terms & Conditions
            </a>{" "}
            and{" "}
            <a href="#" style={linkStyle}>
              Privacy Policy
            </a>
          </div>

          <div style={forgotPasswordStyle}>
            <a href="#" style={forgotLinkStyle}>
              Reset password
            </a>
          </div>

          <div style={registerSectionStyle}>
            <span>Don't have an account yet? </span>
            <a href="#" style={linkStyle}>
              Create a new account
            </a>
          </div>

          <div style={globalSellerStyle}>
            <a href="#" style={linkStyle}>
              Register as Global Seller
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerLogin;
