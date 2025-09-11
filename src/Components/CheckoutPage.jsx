import React, { useState } from "react";
import { useCart } from "./CartContext";

const CheckoutPage = () => {
  // Mock cart data for demonstration
  const { cart } = useCart();

  const [formData, setFormData] = useState({
    fullName: "",
    province: "",
    phoneNumber: "",
    city: "",
    houseNo: "",
    area: "",
    address: "",
    deliveryLabel: "",
  });

  const [promoCode, setPromoCode] = useState("");

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    console.log("Saving delivery information:", formData);
  };

  const handleApplyPromo = () => {
    console.log("Applying promo code:", promoCode);
  };

  const handleProceedToPay = () => {
    console.log("Proceeding to payment");
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
        {/* Left Section - Delivery Form */}
        <div style={{ flex: "2", minWidth: "300px" }}>
          <div
            style={{
              backgroundColor: "white",
              padding: "20px",
              marginBottom: "20px",
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
              Delivery Information
            </h2>

            {/* Full Name + Province */}
            <div style={{ display: "flex", gap: "15px", marginBottom: "15px" }}>
              <div style={{ flex: 1 }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "5px",
                    fontSize: "14px",
                    color: "#333",
                  }}
                >
                  Full name
                </label>
                <input
                  type="text"
                  placeholder="Enter your first and last name"
                  value={formData.fullName}
                  onChange={(e) =>
                    handleInputChange("fullName", e.target.value)
                  }
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
              <div style={{ flex: 1 }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "5px",
                    fontSize: "14px",
                    color: "#333",
                  }}
                >
                  Province
                </label>
                <select
                  value={formData.province}
                  onChange={(e) =>
                    handleInputChange("province", e.target.value)
                  }
                  style={{
                    width: "100%",
                    padding: "10px 12px",
                    border: "1px solid #ddd",
                    borderRadius: "4px",
                    outline: "none",
                    fontSize: "14px",
                    backgroundColor: "white",
                    boxSizing: "border-box",
                  }}
                >
                  <option value="Azad Kashmir">Azad Kashmir</option>
                  <option value="Balochistan">Balochistan</option>
                  <option value="Federally Administered Tribal Areas">
                    Federally Administered Tribal Areas
                  </option>
                  <option value="Gilgit-Baltistan">Gilgit-Baltistan</option>
                  <option value="Islamabad">Islamabad</option>
                  <option value="Khyber Pakhtunkhwa">Khyber Pakhtunkhwa</option>
                  <option value="Punjab">Punjab</option>
                  <option value="Sindh">Sindh</option>
                </select>
              </div>
            </div>

            {/* Phone Number + City */}
            <div style={{ display: "flex", gap: "15px", marginBottom: "15px" }}>
              <div style={{ flex: 1 }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "5px",
                    fontSize: "14px",
                    color: "#333",
                  }}
                >
                  Phone Number
                </label>
                <input
                  type="text"
                  placeholder="Please enter your phone number"
                  value={formData.phoneNumber}
                  onChange={(e) =>
                    handleInputChange("phoneNumber", e.target.value)
                  }
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
              <div style={{ flex: 1 }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "5px",
                    fontSize: "14px",
                    color: "#333",
                  }}
                >
                  City
                </label>
                <select
                  value={formData.city}
                  onChange={(e) => handleInputChange("city", e.target.value)}
                  style={{
                    width: "100%",
                    padding: "10px 12px",
                    border: "1px solid #ddd",
                    borderRadius: "4px",
                    outline: "none",
                    fontSize: "14px",
                    backgroundColor: "white",
                    boxSizing: "border-box",
                  }}
                >
                  <option value="Gujar Khan">Gujar Khan</option>
                  <option value="Rawalpindi">Rawalpindi</option>
                  <option value="Islamabad">Islamabad</option>
                  <option value="Lahore">Lahore</option>
                  <option value="Karachi">Karachi</option>
                </select>
              </div>
            </div>

            {/* Building/House No + Area */}
            <div style={{ display: "flex", gap: "15px", marginBottom: "15px" }}>
              <div style={{ flex: 1 }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "5px",
                    fontSize: "14px",
                    color: "#333",
                  }}
                >
                  Building / House No / Floor / Street
                </label>
                <input
                  type="text"
                  placeholder="Please enter"
                  value={formData.houseNo}
                  onChange={(e) => handleInputChange("houseNo", e.target.value)}
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
              <div style={{ flex: 1 }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "5px",
                    fontSize: "14px",
                    color: "#333",
                  }}
                >
                  Area
                </label>
                <select
                  value={formData.area}
                  onChange={(e) => handleInputChange("area", e.target.value)}
                  style={{
                    width: "100%",
                    padding: "10px 12px",
                    border: "1px solid #ddd",
                    borderRadius: "4px",
                    outline: "none",
                    fontSize: "14px",
                    backgroundColor: "white",
                    boxSizing: "border-box",
                  }}
                >
                  <option value="New Barki">New Barki</option>
                  <option value="Old City">Old City</option>
                  <option value="Commercial Area">Commercial Area</option>
                </select>
              </div>
            </div>

            {/* Colony/Suburb/Locality/Landmark */}
            <div style={{ marginBottom: "15px" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "5px",
                  fontSize: "14px",
                  color: "#333",
                }}
              >
                Colony / Suburb / Locality / Landmark
              </label>
              <input
                type="text"
                placeholder="Please enter"
                value={formData.address}
                onChange={(e) => handleInputChange("address", e.target.value)}
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

            {/* Address Field */}
            <div style={{ marginBottom: "15px" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "5px",
                  fontSize: "14px",
                  color: "#333",
                }}
              >
                Address
              </label>
              <textarea
                placeholder="For Example: House# 123, Street# 123, ABC Road"
                rows="3"
                style={{
                  width: "100%",
                  padding: "10px 12px",
                  border: "1px solid #f57224",
                  borderRadius: "4px",
                  outline: "none",
                  fontSize: "14px",
                  resize: "vertical",
                  boxSizing: "border-box",
                }}
              />
              <small
                style={{
                  color: "#888",
                  fontSize: "12px",
                  display: "block",
                  marginTop: "5px",
                }}
              >
                You can't leave this empty.
              </small>
            </div>

            {/* Label for Delivery */}
            <div style={{ marginBottom: "20px" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "10px",
                  fontSize: "14px",
                  color: "#333",
                  fontWeight: "500",
                }}
              >
                Select a label for effective delivery:
              </label>
              <div style={{ display: "flex", gap: "10px" }}>
                <button
                  onClick={() => handleInputChange("deliveryLabel", "OFFICE")}
                  style={{
                    flex: 1,
                    padding: "10px 15px",
                    border:
                      formData.deliveryLabel === "OFFICE"
                        ? "2px solid #f57224"
                        : "1px solid #ddd",
                    backgroundColor:
                      formData.deliveryLabel === "OFFICE"
                        ? "#fff5f0"
                        : "#f9f9f9",
                    color:
                      formData.deliveryLabel === "OFFICE" ? "#f57224" : "#666",
                    cursor: "pointer",
                    borderRadius: "4px",
                    fontSize: "14px",
                    fontWeight: "500",
                  }}
                >
                  📋 OFFICE
                </button>
                <button
                  onClick={() => handleInputChange("deliveryLabel", "HOME")}
                  style={{
                    flex: 1,
                    padding: "10px 15px",
                    border:
                      formData.deliveryLabel === "HOME"
                        ? "2px solid #f57224"
                        : "1px solid #ddd",
                    backgroundColor:
                      formData.deliveryLabel === "HOME" ? "#fff5f0" : "#f9f9f9",
                    color:
                      formData.deliveryLabel === "HOME" ? "#f57224" : "#666",
                    cursor: "pointer",
                    borderRadius: "4px",
                    fontSize: "14px",
                    fontWeight: "500",
                  }}
                >
                  🏠 HOME
                </button>
              </div>
            </div>

            {/* Save Button */}
            <button
              onClick={handleSave}
              style={{
                padding: "12px 30px",
                backgroundColor: "#3498db",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                fontSize: "14px",
                fontWeight: "600",
                textTransform: "uppercase",
              }}
            >
              SAVE
            </button>
          </div>
        </div>

        {/* Right Section - Order Summary */}
        <div style={{ flex: "1", minWidth: "300px" }}>
          {/* Promotion Section */}
          <div
            style={{
              backgroundColor: "white",
              padding: "20px",
              marginBottom: "20px",
              borderRadius: "4px",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
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
              Promotion
            </h3>
            <div style={{ display: "flex", gap: "10px" }}>
              <input
                type="text"
                placeholder="Enter Store/Daraz Code"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                style={{
                  flex: 1,
                  padding: "10px 12px",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  outline: "none",
                  fontSize: "14px",
                  boxSizing: "border-box",
                }}
              />
              <button
                onClick={handleApplyPromo}
                style={{
                  padding: "10px 20px",
                  backgroundColor: "#3498db",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontSize: "14px",
                  fontWeight: "600",
                }}
              >
                APPLY
              </button>
            </div>
          </div>

          {/* Invoice and Contact Info */}
          <div
            style={{
              backgroundColor: "white",
              padding: "20px",
              marginBottom: "20px",
              borderRadius: "4px",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "10px",
              }}
            >
              <h3
                style={{
                  fontSize: "16px",
                  fontWeight: "600",
                  color: "#333",
                  margin: 0,
                }}
              >
                Invoice and Contact Info
              </h3>
              <button
                style={{
                  background: "none",
                  border: "none",
                  color: "#3498db",
                  cursor: "pointer",
                  fontSize: "14px",
                }}
              >
                Edit
              </button>
            </div>
          </div>

          {/* Order Summary */}
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

            {cart.map((item) => (
              <div
                key={item.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "15px",
                  borderBottom: "1px solid #eee",
                  paddingBottom: "15px",
                }}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  style={{
                    width: "60px",
                    height: "60px",
                    objectFit: "cover",
                    marginRight: "12px",
                    borderRadius: "4px",
                  }}
                />
                <div style={{ flex: 1 }}>
                  <p
                    style={{
                      fontSize: "14px",
                      margin: "0 0 5px",
                      color: "#333",
                    }}
                  >
                    {item.title}
                  </p>
                  <p
                    style={{
                      fontSize: "13px",
                      color: "#666",
                      margin: 0,
                    }}
                  >
                    Qty: {item.quantity}
                  </p>
                </div>
                <p
                  style={{
                    color: "#f57224",
                    fontWeight: "600",
                    fontSize: "14px",
                    margin: 0,
                  }}
                >
                  {item.currentPrice}
                </p>
              </div>
            ))}

            {/* Order Totals */}
            <div style={{ borderTop: "1px solid #eee", paddingTop: "15px" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "8px",
                }}
              >
                <span style={{ fontSize: "14px", color: "#666" }}>
                  Items Total (1 items)
                </span>
                <span style={{ fontSize: "14px", fontWeight: "600" }}>
                  Rs. 5,999
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "12px",
                }}
              >
                <span style={{ fontSize: "14px", color: "#666" }}>
                  Delivery Fee
                </span>
                <span style={{ fontSize: "14px", fontWeight: "600" }}>
                  Rs. 125
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  borderTop: "1px solid #eee",
                  paddingTop: "12px",
                }}
              >
                <span
                  style={{
                    fontSize: "16px",
                    fontWeight: "600",
                    color: "#333",
                  }}
                >
                  Total:
                </span>
                <span
                  style={{
                    fontSize: "18px",
                    fontWeight: "700",
                    color: "#f57224",
                  }}
                >
                  Rs. 6,124
                </span>
              </div>
              <p
                style={{
                  fontSize: "12px",
                  color: "#888",
                  margin: "5px 0 0 0",
                  textAlign: "right",
                }}
              >
                VAT included, where applicable
              </p>
            </div>

            {/* Proceed to Pay Button */}
            <button
              onClick={handleProceedToPay}
              style={{
                width: "100%",
                padding: "15px",
                backgroundColor: "#f57224",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "not-allowed",
                fontSize: "16px",
                fontWeight: "600",
                marginTop: "20px",
                textTransform: "uppercase",
              }}
            >
              Proceed to Pay
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
