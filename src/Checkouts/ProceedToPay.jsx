import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../Cart/CartContext"; // adjust path if different
import DarazFooter from "../HeaderFooter/DarazFooter";
import { sendOrderEmail } from "../EmailData/emailService"; // adjust path if needed

const ProceedToPayPage = () => {
  const [selectedPayment, setSelectedPayment] = useState("");
  const [showPaymentInterface, setShowPaymentInterface] = useState(false);
  const [showThankYouPopup, setShowThankYouPopup] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const { clearCart } = useCart();
  const { orderSummary, address } = location.state || {};
  const loggedInUser = JSON.parse(localStorage.getItem("userId"));
  const userEmail = loggedInUser?.email || ""; // safely get email

  const handlePayment = () => {
    if (!selectedPayment) {
      alert("Please select a payment method.");
      return;
    }
    setShowPaymentInterface(true);
  };

  // Default order summary if not passed
  const defaultOrderSummary = {
    itemsTotal: 0,

    totalAmount: 0,
    itemCount: 0,
  };

  const orderData = orderSummary || defaultOrderSummary;
  const handlePaymentSelect = (method) => {
    setSelectedPayment(method);
    if (method === "easypaisa" || method === "cod") {
      setShowPaymentInterface(true);
    } else {
      setShowPaymentInterface(false);
    }
  };

  const handleConfirmOrder = async () => {
    const orderId = "DZ123456789";

    try {
      await sendOrderEmail({
        to_name: loggedInUser.name,
        to_email: userEmail, // use logged-in user's email
        order_id: orderId,
        amount: totalAmount,
        payment_method: selectedPayment,
      });
      alert("Order email sent!");
    } catch (error) {
      console.error("Failed to send order email:", error);
    } finally {
      // ✅ Popup will show no matter what
      setShowThankYouPopup(true);
      clearCart(); // optional
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#f5f5f5",
        minHeight: "100vh",
        fontFamily: "Arial, sans-serif",
        padding: "20px 0",
      }}
    >
      {/* Warning Banner */}
      <div
        style={{
          backgroundColor: "#fff3cd",
          border: "1px solid #ffeaa7",
          borderRadius: "4px",
          padding: "12px 20px",
          margin: "0 20px 20px 20px",
          display: "flex",
          alignItems: "center",
          color: "#856404",
          fontSize: "14px",
        }}
      >
        <span style={{ marginRight: "8px", color: "#f39c12" }}>⚠️</span>
        Please collect bank vouchers to avail bank discounts and mega
        deals/flash sales.
      </div>

      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 20px",
          display: "flex",
          gap: "20px",
          flexWrap: "wrap",
        }}
      >
        {/* Left Section - Payment Methods */}
        <div style={{ flex: "2", minWidth: "300px" }}>
          <div
            style={{
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "4px",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            }}
          >
            <h2
              style={{
                fontSize: "18px",
                fontWeight: "600",
                marginBottom: "20px",
                color: "#333",
              }}
            >
              Select Payment Method
            </h2>

            {/* Payment Options Grid */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(100px, 1fr))",
                gap: "15px",
                marginBottom: "30px",
              }}
            >
              {/* EasyPaisa */}
              <div
                onClick={() => handlePaymentSelect("easypaisa")}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  padding: "20px 15px",
                  border:
                    selectedPayment === "easypaisa"
                      ? "2px solid #f57224"
                      : "1px solid #ddd",
                  borderRadius: "8px",
                  cursor: "pointer",
                  backgroundColor:
                    selectedPayment === "easypaisa" ? "#fff5f0" : "white",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    border: selectedPayment === "easypaisa",

                    borderRadius: "8px",
                    padding: "15px",
                    textAlign: "center",
                    cursor: "pointer",
                    backgroundColor:
                      selectedPayment === "easypaisa" ? "#fff5f0" : "white",
                  }}
                >
                  <img
                    src="https://laz-img-cdn.alicdn.com/tfs/TB1LkpwLAY2gK0jSZFgXXc5OFXa-400-400.png"
                    alt="Easypaisa"
                    style={{
                      width: "50px",
                      height: "50px",
                      objectFit: "contain",
                      marginBottom: "10px",
                    }}
                  />
                  <span style={{ fontSize: "12px", fontWeight: "500" }}>
                    Easypaisa
                  </span>
                </div>
              </div>

              {/* JazzCash */}
              <div
                onClick={() => handlePaymentSelect("jazzcash")}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  padding: "20px 15px",
                  border:
                    selectedPayment === "jazzcash"
                      ? "2px solid #f57224"
                      : "1px solid #ddd",
                  borderRadius: "8px",
                  cursor: "pointer",
                  backgroundColor:
                    selectedPayment === "jazzcash" ? "#fff5f0" : "white",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    border: selectedPayment === "jazzcash",
                    borderRadius: "8px",
                    padding: "15px",
                    textAlign: "center",
                    cursor: "pointer",
                    backgroundColor:
                      selectedPayment === "jazzcash" ? "#fff5f0" : "white",
                  }}
                >
                  <img
                    src="https://img.alicdn.com/imgextra/i4/O1CN01RGDk9h1RIoR3DER2v_!!6000000002089-2-tps-160-161.png"
                    alt="JazzCash"
                    style={{
                      width: "50px",
                      height: "50px",
                      objectFit: "contain",
                      marginBottom: "10px",
                    }}
                  />
                  <span style={{ fontSize: "12px", fontWeight: "500" }}>
                    JazzCash
                  </span>
                </div>
              </div>

              {/* Credit/Debit Card */}
              <div
                onClick={() => handlePaymentSelect("card")}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  padding: "20px 15px",
                  border:
                    selectedPayment === "card"
                      ? "2px solid #f57224"
                      : "1px solid #ddd",
                  borderRadius: "8px",
                  cursor: "pointer",
                  backgroundColor:
                    selectedPayment === "card" ? "#fff5f0" : "white",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    border: selectedPayment === "card",
                    borderRadius: "8px",
                    padding: "15px",
                    textAlign: "center",
                    cursor: "pointer",
                    backgroundColor:
                      selectedPayment === "card" ? "#fff5f0" : "white",
                  }}
                >
                  <img
                    src="https://laz-img-cdn.alicdn.com/tfs/TB1Iey_osKfxu4jSZPfXXb3dXXa-96-96.png"
                    alt="Card"
                    style={{
                      width: "50px",
                      height: "50px",
                      objectFit: "contain",
                      marginBottom: "10px",
                    }}
                  />
                </div>
                <span style={{ fontSize: "12px", fontWeight: "500" }}>
                  Credit/Debit Card
                </span>
                <small style={{ fontSize: "10px", color: "#666" }}>
                  Credit/Debit Card
                </small>
              </div>

              {/* HBL Bank Account */}
              <div
                onClick={() => handlePaymentSelect("hbl")}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  padding: "20px 15px",
                  border:
                    selectedPayment === "hbl"
                      ? "2px solid #f57224"
                      : "1px solid #ddd",
                  borderRadius: "8px",
                  cursor: "pointer",
                  backgroundColor:
                    selectedPayment === "hbl" ? "#fff5f0" : "white",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    border: selectedPayment === "hbl",
                    borderRadius: "8px",
                    padding: "15px",
                    textAlign: "center",
                    cursor: "pointer",
                    backgroundColor:
                      selectedPayment === "hbl" ? "#fff5f0" : "white",
                  }}
                >
                  <img
                    src="https://laz-img-cdn.alicdn.com/tfs/TB1oXEdqRjTBKNjSZFNXXasFXXa-80-80.png"
                    alt="HBL"
                    style={{
                      width: "50px",
                      height: "50px",
                      objectFit: "contain",
                      marginBottom: "10px",
                    }}
                  />
                </div>
                <span style={{ fontSize: "12px", fontWeight: "500" }}>
                  HBL Bank Account
                </span>
              </div>

              {/* Cash on Delivery */}
              <div
                onClick={() => handlePaymentSelect("cod")}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  padding: "20px 15px",
                  border:
                    selectedPayment === "cod"
                      ? "2px solid #f57224"
                      : "1px solid #ddd",
                  borderRadius: "8px",
                  cursor: "pointer",
                  backgroundColor:
                    selectedPayment === "cod" ? "#fff5f0" : "white",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    border: selectedPayment === "cod",
                    borderRadius: "8px",
                    padding: "15px",
                    textAlign: "center",
                    cursor: "pointer",
                    backgroundColor:
                      selectedPayment === "cod" ? "#fff5f0" : "white",
                  }}
                >
                  <img
                    src="https://laz-img-cdn.alicdn.com/tfs/TB1ZP8kM1T2gK0jSZFvXXXnFXXa-96-96.png"
                    alt="COD"
                    style={{
                      width: "50px",
                      height: "50px",
                      objectFit: "contain",
                      marginBottom: "10px",
                    }}
                  />
                </div>
                <span style={{ fontSize: "12px", fontWeight: "500" }}>
                  Cash on Delivery
                </span>
                <small style={{ fontSize: "10px", color: "#666" }}>
                  Cash on Delivery
                </small>
              </div>

              {/* Installment */}
              <div
                onClick={() => handlePaymentSelect("installment")}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  padding: "20px 15px",
                  border:
                    selectedPayment === "installment"
                      ? "2px solid #f57224"
                      : "1px solid #ddd",
                  borderRadius: "8px",
                  cursor: "pointer",
                  backgroundColor:
                    selectedPayment === "installment" ? "#fff5f0" : "white",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    border: selectedPayment === "installment",
                    borderRadius: "8px",
                    padding: "15px",
                    textAlign: "center",
                    cursor: "pointer",
                    backgroundColor:
                      selectedPayment === "installment" ? "#fff5f0" : "white",
                  }}
                >
                  <img
                    src="https://laz-img-cdn.alicdn.com/tfs/TB1zkQlr77mBKNjSZFyXXbydFXa-80-80.png"
                    alt="Installment"
                    style={{
                      width: "50px",
                      height: "50px",
                      objectFit: "contain",
                      marginBottom: "10px",
                    }}
                  />
                </div>
                <span style={{ fontSize: "12px", fontWeight: "500" }}>
                  Installment
                </span>
              </div>
            </div>

            {/* Payment Interface */}
            {showPaymentInterface && selectedPayment === "easypaisa" && (
              <div
                style={{
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  padding: "20px",
                  marginBottom: "20px",
                  backgroundColor: "#f9f9f9",
                }}
              >
                <h3
                  style={{
                    fontSize: "16px",
                    fontWeight: "600",
                    marginBottom: "15px",
                    color: "#333",
                  }}
                >
                  EasyPaisa Payment
                </h3>
                <div style={{ marginBottom: "15px" }}>
                  <label
                    style={{
                      display: "block",
                      marginBottom: "5px",
                      fontSize: "14px",
                      color: "#333",
                    }}
                  >
                    Enter your EasyPaisa account number
                  </label>
                  <input
                    type="text"
                    placeholder="03XXXXXXXXX"
                    style={{
                      width: "100%",
                      padding: "10px 12px",
                      border: "1px solid #ddd",
                      borderRadius: "4px",
                      outline: "none",
                      fontSize: "14px",
                      boxSizing: "border-box",
                    }}
                  />
                </div>
                <p
                  style={{ fontSize: "12px", color: "#666", margin: "10px 0" }}
                >
                  You will receive an SMS with payment instructions.
                </p>
              </div>
            )}

            {showPaymentInterface && selectedPayment === "cod" && (
              <div
                style={{
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  padding: "20px",
                  marginBottom: "20px",
                  backgroundColor: "#f9f9f9",
                }}
              >
                <h3
                  style={{
                    fontSize: "16px",
                    fontWeight: "600",
                    marginBottom: "15px",
                    color: "#333",
                  }}
                >
                  Cash on Delivery Instructions
                </h3>
                <div
                  style={{ fontSize: "14px", color: "#333", lineHeight: "1.5" }}
                >
                  <p style={{ marginBottom: "10px" }}>
                    • You may pay in cash to our courier upon receiving your
                    parcel at the doorstep
                  </p>
                  <p style={{ marginBottom: "10px" }}>
                    • Before agreeing to receive the parcel, check if your
                    delivery status has been updated to "Out for Delivery"
                  </p>
                  <p style={{ marginBottom: "10px" }}>
                    • Before receiving, confirm that the airway bill shows that
                    the parcel is from Daraz
                  </p>
                  <p style={{ marginBottom: "10px" }}>
                    • Before you make payment to the courier, confirm your order
                    number, sender information and tracking number on the parcel
                  </p>
                  <p style={{ marginBottom: "0" }}>
                    • Cash Payment Fee of Rs. 50 applies only to Cash on
                    Delivery payment method. There is no extra fee when using
                    other payment methods
                  </p>
                </div>
              </div>
            )}

            {/* Confirm Order Button */}
            <button
              onClick={handleConfirmOrder}
              disabled={!selectedPayment}
              style={{
                backgroundColor: selectedPayment ? "#f57224" : "#ccc",
                color: "white",
                padding: "12px 30px",
                border: "none",
                borderRadius: "4px",
                cursor: selectedPayment ? "pointer" : "not-allowed",
                fontSize: "14px",
                fontWeight: "600",
                textTransform: "uppercase",
              }}
            >
              Confirm Order
            </button>
          </div>
        </div>

        {showThankYouPopup && (
          <div
            style={{
              position: "fixed",
              top: "0",
              left: "0",
              width: "100%",
              height: "100%",
              background: "rgba(0,0,0,0.6)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: "9999",
            }}
          >
            <div
              style={{
                background: "linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)",
                padding: "40px 35px",
                borderRadius: "12px",
                textAlign: "center",
                width: "420px",
                maxWidth: "90vw",
                boxShadow:
                  "0 15px 35px rgba(0,0,0,0.15), 0 5px 15px rgba(0,0,0,0.1)",
                border: "1px solid rgba(245, 114, 36, 0.1)",
                position: "relative",
                animation: "popupSlideIn 0.3s ease-out",
              }}
            >
              {/* Success Icon */}
              <div
                style={{
                  width: "80px",
                  height: "80px",
                  backgroundColor: "#28a745",
                  borderRadius: "50%",
                  margin: "0 auto 25px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 8px 25px rgba(40, 167, 69, 0.3)",
                  animation: "iconBounce 0.6s ease-out 0.2s both",
                }}
              >
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M9 12l2 2 4-4"
                    stroke="white"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              {/* Title */}
              <h2
                style={{
                  color: "#2c3e50",
                  marginBottom: "12px",
                  fontSize: "24px",
                  fontWeight: "700",
                  letterSpacing: "-0.5px",
                }}
              >
                Order Placed Successfully!
              </h2>

              {/* Thank you message */}
              <p
                style={{
                  fontSize: "16px",
                  color: "#28a745",
                  fontWeight: "600",
                  marginBottom: "8px",
                }}
              >
                🎉 Thank You!
              </p>

              {/* Description */}
              <p
                style={{
                  marginBottom: "25px",
                  fontSize: "15px",
                  color: "#6c757d",
                  lineHeight: "1.5",
                  maxWidth: "320px",
                  margin: "0 auto 25px",
                }}
              >
                Your order has been placed successfully using Cash on Delivery.
                You'll receive a confirmation SMS shortly.
              </p>

              {/* Order Info Box */}
              <div
                style={{
                  backgroundColor: "rgba(245, 114, 36, 0.05)",
                  border: "1px solid rgba(245, 114, 36, 0.1)",
                  borderRadius: "8px",
                  padding: "15px",
                  marginBottom: "30px",
                  fontSize: "14px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "8px",
                  }}
                >
                  <span style={{ color: "#6c757d" }}>Order ID:</span>
                  <span style={{ color: "#2c3e50", fontWeight: "600" }}>
                    #DZ123456789
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "8px",
                  }}
                >
                  <span style={{ color: "#6c757d" }}>Payment:</span>
                  <span style={{ color: "#28a745", fontWeight: "600" }}>
                    Cash on Delivery
                  </span>
                </div>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <span style={{ color: "#6c757d" }}>Delivery:</span>
                  <span style={{ color: "#2c3e50", fontWeight: "600" }}>
                    3-5 Business Days
                  </span>
                </div>
              </div>

              {/* Buttons */}
              <div
                style={{
                  display: "flex",
                  gap: "12px",
                  justifyContent: "center",
                }}
              >
                <button
                  style={{
                    backgroundColor: "transparent",
                    color: "#f57224",
                    padding: "12px 24px",
                    border: "2px solid #f57224",
                    borderRadius: "6px",
                    cursor: "pointer",
                    fontSize: "14px",
                    fontWeight: "600",
                    transition: "all 0.3s ease",
                    minWidth: "120px",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = "#f57224";
                    e.target.style.color = "white";
                    e.target.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = "transparent";
                    e.target.style.color = "#f57224";
                    e.target.style.transform = "translateY(0)";
                  }}
                >
                  Track Order
                </button>

                <button
                  onClick={() => {
                    navigate("/");
                    clearCart([]);
                  }}
                  style={{
                    backgroundColor: "#f57224",
                    color: "white",
                    padding: "12px 24px",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer",
                    fontSize: "14px",
                    fontWeight: "600",
                    boxShadow: "0 4px 15px rgba(245, 114, 36, 0.3)",
                    transition: "all 0.3s ease",
                    minWidth: "140px",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = "#e55a15";
                    e.target.style.transform = "translateY(-2px)";
                    e.target.style.boxShadow =
                      "0 6px 20px rgba(245, 114, 36, 0.4)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = "#f57224";
                    e.target.style.transform = "translateY(0)";
                    e.target.style.boxShadow =
                      "0 4px 15px rgba(245, 114, 36, 0.3)";
                  }}
                >
                  Continue Shopping
                </button>
              </div>

              {/* Decorative elements */}
              <div
                style={{
                  position: "absolute",
                  top: "-5px",
                  left: "-5px",
                  right: "-5px",
                  height: "4px",
                  background:
                    "linear-gradient(90deg, #f57224, #ff8c42, #f57224)",
                  borderRadius: "12px 12px 0 0",
                }}
              />

              <style>
                {`
      @keyframes popupSlideIn {
        from {
          opacity: 0;
          transform: scale(0.8) translateY(-20px);
        }
        to {
          opacity: 1;
          transform: scale(1) translateY(0);
        }
      }
      
      @keyframes iconBounce {
        from {
          opacity: 0;
          transform: scale(0);
        }
        60% {
          transform: scale(1.1);
        }
        to {
          opacity: 1;
          transform: scale(1);
        }
      }
    `}
              </style>
            </div>
          </div>
        )}

        {/* Right Section - Order Summary */}
        <div style={{ flex: "1", minWidth: "300px" }}>
          <div
            style={{
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "4px",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            }}
          >
            <h3
              style={{
                fontSize: "16px",
                fontWeight: "600",
                marginBottom: "20px",
                color: "#333",
              }}
            >
              Order Summary
            </h3>

            {/* Order Totals */}
            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "8px",
                }}
              >
                <span style={{ fontSize: "14px", color: "#666" }}>
                  Subtotal ({orderData.itemCount} items and shipping fee
                  included)
                </span>
                <span style={{ fontSize: "14px", fontWeight: "600" }}>
                  Rs. {orderData.itemsTotal}
                </span>
              </div>
              {/* <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "12px",
                }}
              >
                <span style={{ fontSize: "14px", color: "#666" }}>
                  Cash Payment Fee
                </span>
                <span style={{ fontSize: "14px", fontWeight: "600" }}>
                  Rs. {orderData.cashPaymentFee}
                </span>
              </div> */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  borderTop: "1px solid #eee",
                  paddingTop: "12px",
                }}
              >
                <span
                  style={{ fontSize: "16px", fontWeight: "600", color: "#333" }}
                >
                  Total Amount
                </span>
                <span
                  style={{
                    fontSize: "18px",
                    fontWeight: "700",
                    color: "#f57224",
                  }}
                >
                  Rs. {orderData.totalAmount}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <br></br>
      <div
        style={{
          margintop: "auto" /* Pushes footer to the bottom */,
          padding: "80px",
        }}
      >
        <DarazFooter />
      </div>
    </div>
  );
};

export default ProceedToPayPage;
