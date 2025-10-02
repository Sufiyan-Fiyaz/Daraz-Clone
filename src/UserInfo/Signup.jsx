import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { sendWelcomeEmail } from "../EmailData/emailService"; // ✅ Import email function
import { toast } from "react-toastify";

const Signup = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError(""); // Reset previous errors

    if (!fullName || !email || !phone || !password) {
      setError("Please fill all fields");
      return;
    }

    try {
      const res = await axios.post(
        "https://localhost:7292/api/Users/register",
        {
          fullName: fullName,
          email,
          phone,
          password,
          role: "customer",
        }
      );

      toast.success(res.data.message || "Registration successful!");

      // ✅ Send Welcome Email automatically
      try {
        await sendWelcomeEmail(fullName, email); // Pass name and email

        console.log("Welcome email sent successfully!");
      } catch (err) {
        console.error("Error sending welcome email:", err);
      }

      // Reset form
      setFullName("");
      setEmail("");
      setPhone("");
      setPassword("");
      setError("");
      navigate("/login"); // Redirect to login page
    } catch (err) {
      if (err.response && err.response.data) {
        toast.error(err.response.data.message || "Registration failed");
      } else {
        toast.error("Network error. Please try again.");
      }
    }
  };

  return (
    <div style={styles.pageContainer}>
      <div style={styles.container}>
        <div style={styles.header}>
          <h2 style={styles.title}>Create your Daraz Account</h2>
          <p style={styles.loginPrompt}>
            Already member?{" "}
            <Link to="/login" style={styles.loginLink}>
              Login here.
            </Link>
          </p>
        </div>

        <form onSubmit={handleSignup} style={styles.form}>
          <div style={styles.formRow}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Phone Number *</label>
              <input
                type="text"
                placeholder="Enter your phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                style={styles.input}
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Full Name*</label>
              <input
                type="text"
                placeholder="First Last"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                style={styles.input}
              />
            </div>
          </div>

          <div style={styles.formRow}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Email*</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={styles.input}
              />
            </div>
            <div style={styles.formGroup}>
              <div style={styles.checkboxContainer}>
                <input
                  type="checkbox"
                  id="promotions"
                  style={styles.checkbox}
                />
                <label htmlFor="promotions" style={styles.checkboxLabel}>
                  I'd like to receive exclusive offers and promotions via SMS
                </label>
              </div>
            </div>
          </div>

          <div style={styles.formRow}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Password*</label>
              <div style={styles.passwordContainer}>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Minimum 6 characters with a number and a letter"
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
            <div style={styles.formGroup}></div>
          </div>

          {error && <p style={styles.error}>{error}</p>}

          <button type="submit" style={styles.signupButton}>
            SIGN UP
          </button>

          <div style={styles.termsContainer}>
            <p style={styles.termsText}>
              By clicking "SIGN UP" I agree to{" "}
              <Link to="/terms" style={styles.termsLink}>
                Terms of Use
              </Link>{" "}
              and{" "}
              <Link to="/privacy" style={styles.termsLink}>
                Privacy Policy
              </Link>
            </p>
          </div>

          <div style={styles.socialContainer}>
            <p style={styles.socialText}>Or, sign up with</p>
            <div style={styles.socialButtons}>
              <button type="button" style={styles.facebookButton}>
                <span style={styles.facebookIcon}>f</span>
                Facebook
              </button>
              <button type="button" style={styles.googleButton}>
                <span style={styles.googleIcon}>G+</span>
                Google
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;

// Inline Styles matching the Daraz design
const styles = {
  pageContainer: {
    backgroundColor: "#f5f5f5",
    minHeight: "100vh",
    padding: "40px 20px",
  },
  container: {
    maxWidth: "600px",
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
    fontSize: "24px",
    fontWeight: "normal",
    color: "#333",
    margin: "0 0 10px 0",
  },
  loginPrompt: {
    margin: 0,
    fontSize: "14px",
    color: "#666",
  },
  loginLink: {
    color: "#1976d2",
    textDecoration: "none",
  },
  form: {
    padding: "30px 40px 40px",
  },
  formRow: {
    display: "flex",
    gap: "20px",
    marginBottom: "20px",
  },
  formGroup: {
    flex: 1,
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
  checkboxContainer: {
    display: "flex",
    alignItems: "flex-start",
    gap: "8px",
    marginTop: "25px",
  },
  checkbox: {
    marginTop: "2px",
    flexShrink: 0,
  },
  checkboxLabel: {
    fontSize: "13px",
    color: "#666",
    lineHeight: "1.4",
    cursor: "pointer",
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
    color: "#666",
  },
  error: {
    color: "#d32f2f",
    fontSize: "14px",
    margin: "10px 0",
    textAlign: "center",
  },
  signupButton: {
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
  termsContainer: {
    textAlign: "center",
    marginTop: "20px",
  },
  termsText: {
    fontSize: "13px",
    color: "#666",
    lineHeight: "1.4",
    margin: 0,
  },
  termsLink: {
    color: "#1976d2",
    textDecoration: "none",
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
    backgroundColor: "#4267B2",
    color: "#fff",
    border: "none",
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
    backgroundColor: "#3b5998",
    color: "#fff",
    width: "20px",
    height: "20px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "15px",
    fontWeight: "bold",
  },
  googleButton: {
    flex: 1,
    padding: "12px",
    backgroundColor: "#d34836",
    color: "#fff",
    border: "none",
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
    backgroundColor: "#d34836",
    color: "#fff",
    width: "20px",
    height: "20px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "15x",
    fontWeight: "bold",
  },
};
