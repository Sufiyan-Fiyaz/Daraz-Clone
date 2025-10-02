import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { toast } from "react-toastify";

const Login = () => {
  const [identifier, setIdentifier] = useState(""); // email or phone
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!identifier || !password) {
      setError("Please enter email or phone and password");
      return;
    }

    try {
      const res = await axios.post("https://localhost:7292/api/Users/login", {
        identifier: identifier,
        password: password,
      });

      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
      }

      localStorage.setItem("userId", res.data.id);
      localStorage.setItem("userName", res.data.fullName);

      // ✅ show toast instead of alert
      toast.success(res.data.message || "Login successful!");

      window.dispatchEvent(new Event("userLogin"));

      // Clear form
      setIdentifier("");
      setPassword("");
      setError("");
      login(res.data);
      navigate("/");
    } catch (err) {
      if (err.response && err.response.data) {
        toast.error(err.response.data.message || "Invalid credentials");
      } else {
        toast.error("Network error. Please try again.");
      }
    }
  };

  return (
    <div style={styles.pageContainer}>
      <div style={styles.container}>
        <div style={styles.header}>
          <h2 style={styles.title}>Welcome to Daraz! Please login.</h2>
          <p style={styles.registerPrompt}>
            New member?{" "}
            <Link to="/signup" style={styles.registerLink}>
              Register here.
            </Link>
          </p>
        </div>

        <div style={styles.formContainer}>
          <h3 style={styles.formTitle}>Login with Password</h3>

          <form onSubmit={handleLogin} style={styles.form}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Phone Number or Email*</label>
              <input
                type="text"
                placeholder="Please enter your Phone Number or Email"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                style={styles.input}
              />
            </div>

            <div style={styles.formGroup}>
              <div style={styles.passwordHeader}>
                <label style={styles.label}>Password*</label>
                <Link to="/forgot-password" style={styles.forgotLink}>
                  Forgot Password?
                </Link>
              </div>
              <div style={styles.passwordContainer}>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Please enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={styles.passwordInput}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={styles.eyeButton}
                >
                  👁
                </button>
              </div>
            </div>

            {error && <p style={styles.error}>{error}</p>}

            <button type="submit" style={styles.loginButton}>
              LOGIN
            </button>

            <div style={styles.socialContainer}>
              <p style={styles.socialText}>Or, login with</p>
              <div style={styles.socialButtons}>
                <button type="button" style={styles.facebookButton}>
                  <span style={styles.facebookIcon}>f</span>
                  Facebook
                </button>
                <button type="button" style={styles.googleButton}>
                  <span style={styles.googleIcon}>G</span>
                  Google
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

const styles = {
  pageContainer: {
    backgroundColor: "#f5f5f5",
    minHeight: "100vh",
    padding: "40px 20px",
  },
  container: {
    maxWidth: "500px",
    margin: "0 auto",
    backgroundColor: "#fff",
    borderRadius: "4px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    overflow: "hidden",
  },
  header: {
    padding: "30px 40px 20px",
    borderBottom: "1px solid #f0f0f0",
  },
  title: {
    fontSize: "22px",
    fontWeight: "normal",
    color: "#333",
    margin: "0 0 10px 0",
  },
  registerPrompt: {
    margin: 0,
    fontSize: "14px",
    color: "#666",
  },
  registerLink: {
    color: "#1976d2",
    textDecoration: "none",
  },
  formContainer: {
    padding: "30px 40px 40px",
  },
  formTitle: {
    fontSize: "18px",
    fontWeight: "500",
    color: "#333",
    margin: "0 0 25px 0",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  formGroup: {
    marginBottom: "20px",
  },
  label: {
    display: "block",
    fontSize: "14px",
    color: "#333",
    marginBottom: "8px",
    fontWeight: "500",
  },
  input: {
    width: "100%",
    padding: "12px 16px",
    border: "1px solid #ddd",
    borderRadius: "4px",
    fontSize: "14px",
    color: "#333",
    backgroundColor: "#fff",
    boxSizing: "border-box",
  },
  passwordHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "8px",
  },
  forgotLink: {
    fontSize: "13px",
    color: "#1976d2",
    textDecoration: "none",
  },
  passwordContainer: {
    position: "relative",
  },
  passwordInput: {
    width: "100%",
    padding: "12px 40px 12px 16px",
    border: "1px solid #ddd",
    borderRadius: "4px",
    fontSize: "14px",
    color: "#333",
    backgroundColor: "#fff",
    boxSizing: "border-box",
  },
  eyeButton: {
    position: "absolute",
    right: "12px",
    top: "50%",
    transform: "translateY(-50%)",
    background: "none",
    border: "none",
    cursor: "pointer",
    fontSize: "16px",
    color: "#999",
  },
  error: {
    color: "#d32f2f",
    fontSize: "14px",
    margin: "10px 0",
    textAlign: "center",
  },
  loginButton: {
    width: "100%",
    padding: "14px",
    backgroundColor: "#f57224",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    marginTop: "10px",
    letterSpacing: "0.5px",
  },
  socialContainer: {
    marginTop: "30px",
    textAlign: "center",
  },
  socialText: {
    fontSize: "14px",
    color: "#666",
    marginBottom: "15px",
  },
  socialButtons: {
    display: "flex",
    gap: "10px",
  },
  facebookButton: {
    flex: 1,
    padding: "12px",
    backgroundColor: "#fff",
    color: "#4267B2",
    border: "1px solid #4267B2",
    borderRadius: "4px",
    fontSize: "14px",
    fontWeight: "500",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
  },
  facebookIcon: {
    backgroundColor: "#4267B2",
    color: "#fff",
    width: "20px",
    height: "20px",
    borderRadius: "2px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "12px",
    fontWeight: "bold",
  },
  googleButton: {
    flex: 1,
    padding: "12px",
    backgroundColor: "#fff",
    color: "#666",
    border: "1px solid #ddd",
    borderRadius: "4px",
    fontSize: "14px",
    fontWeight: "500",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
  },
  googleIcon: {
    backgroundColor: "#db4437",
    color: "#fff",
    width: "20px",
    height: "20px",
    borderRadius: "2px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "10px",
    fontWeight: "bold",
  },
};
