import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../Cart/CartContext";
import { toast } from "react-toastify";

const CheckoutPage = () => {
  const { cart } = useCart();
  const navigate = useNavigate();
  const BASE_URL = "https://localhost:7292"; // same as CartPage

  const getImageUrl = (images) => {
    const extractUrl = (obj) => {
      if (!obj) return null;

      if (typeof obj === "string")
        return obj.startsWith("http") ? obj : `${BASE_URL}${obj}`;

      if (obj.imageUrl && typeof obj.imageUrl === "string")
        return obj.imageUrl.startsWith("http")
          ? obj.imageUrl
          : `${BASE_URL}${obj.imageUrl}`;

      if (Array.isArray(obj) && obj.length > 0) return extractUrl(obj[0]);

      if (obj.$values && Array.isArray(obj.$values) && obj.$values.length > 0)
        return extractUrl(obj.$values[0]);

      return null;
    };

    return extractUrl(images) || "/placeholder.png";
  };

  const [formData, setFormData] = useState({
    fullName: "",
    province: "",
    phoneNumber: "",
    city: "",
    houseNo: "",
    area: "",
    address: "", // Colony / Suburb / Locality / Landmark
    addressDetail: "", // Address textarea (house#, street#, etc.)
    deliveryLabel: "",
  });
  const deliveryFee = 125;
  const subtotal = cart.reduce((sum, item) => {
    const price = Number(String(item.currentPrice || 0).replace(/[^\d]/g, ""));
    return sum + price * (item.quantity || 1);
  }, 0);
  const total = subtotal + deliveryFee;

  const [address, setAddress] = useState("");

  const [promoCode, setPromoCode] = useState("");
  const [isSaved, setIsSaved] = useState(false); // Track if delivery info is saved

  // Prefill form from localStorage if exists
  useEffect(() => {
    const savedData = localStorage.getItem("deliveryInfo");
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        if (parsed && parsed.isSaved) {
          setFormData((prev) => ({ ...prev, ...parsed }));
          setIsSaved(true);
        }
      } catch (e) {
        console.error("Error parsing saved delivery info:", e);
      }
    }
  }, []);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };
  const handleSave = () => {
    if (
      !formData.fullName ||
      !formData.phoneNumber ||
      !formData.province ||
      !formData.city ||
      !formData.area ||
      !formData.houseNo ||
      !formData.address
    ) {
      toast("Please fill all required fields.");
      return;
    }
    localStorage.setItem(
      "deliveryInfo",
      JSON.stringify({ ...formData, isSaved: true })
    );
    setIsSaved(true);

    // Save to localStorage
    localStorage.setItem(
      "deliveryInfo",
      JSON.stringify({ ...formData, isSaved: true })
    );
    setIsSaved(true);
    toast("Delivery information saved successfully!");
  };

  const handleSaveInfo = () => {
    if (!address.trim()) {
      toast("Please enter your address.");
      return;
    }
    setIsSaved(true);
  };

  const handleApplyPromo = () => {
    console.log("Applying promo code:", promoCode);
  };

  const handleProceedToPay = () => {
    if (!isSaved) {
      toast("Please save your address first!");
      return;
    }

    navigate("/proceed-to-pay", {
      state: {
        address,
        orderSummary: {
          itemsTotal: subtotal, // ✅ jo pehle subtotal bhej rahe the

          totalAmount: total, // ✅ jo pehle total bhej rahe the
          itemCount: cart.length, // ✅ naye field ke liye
        },
      },
    });
  };

  const handleEdit = () => {
    setIsSaved(false);
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

            {isSaved ? (
              // ✅ Summary replaces form
              <div
                style={{
                  border: "1px solid #ddd",
                  borderRadius: "6px",
                  padding: "15px",
                  position: "relative",
                }}
              >
                <div style={{ fontSize: "14px", marginBottom: "5px" }}>
                  <strong>{formData.fullName}</strong> &nbsp;{" "}
                  {formData.phoneNumber}
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <span
                    style={{
                      backgroundColor: "#ff5722",
                      color: "#fff",
                      fontSize: "12px",
                      fontWeight: "bold",
                      padding: "3px 8px",
                      borderRadius: "12px",
                      marginRight: "10px",
                    }}
                  >
                    HOME
                  </span>
                  <span style={{ fontSize: "14px" }}>
                    {formData.houseNo}, {formData.address}, {formData.area},{" "}
                    {formData.city}, {formData.province}
                  </span>
                </div>
                <button
                  onClick={handleEdit}
                  style={{
                    position: "absolute",
                    right: "10px",
                    top: "10px",
                    fontSize: "12px",
                    color: "#007bff",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  EDIT
                </button>
              </div>
            ) : (
              // ✅ Form in same section
              <div>
                {/* Full Name + Province */}
                <div
                  style={{ display: "flex", gap: "15px", marginBottom: "15px" }}
                >
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
                      <option value="">Please choose you province</option>
                      <option value="Azad Kashmir">Azad Kashmir</option>
                      <option value="Balochistan">Balochistan</option>
                      <option value="Federally Administered Tribal Areas">
                        Federally Administered Tribal Areas
                      </option>
                      <option value="Gilgit-Baltistan">Gilgit-Baltistan</option>
                      <option value="Islamabad">Islamabad</option>
                      <option value="Khyber Pakhtunkhwa">
                        Khyber Pakhtunkhwa
                      </option>
                      <option value="Punjab">Punjab</option>
                      <option value="Sindh">Sindh</option>
                    </select>
                  </div>
                </div>

                {/* Phone Number + City */}
                <div
                  style={{ display: "flex", gap: "15px", marginBottom: "15px" }}
                >
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
                      onChange={(e) =>
                        handleInputChange("city", e.target.value)
                      }
                      disabled={!formData.province} // Disable until province is selected
                      style={{
                        width: "100%",
                        padding: "10px 12px",
                        border: "1px solid #ddd",
                        borderRadius: "4px",
                        outline: "none",
                        fontSize: "14px",
                        backgroundColor: formData.province
                          ? "white"
                          : "#f0f0f0", // grey background if disabled
                        boxSizing: "border-box",
                      }}
                    >
                      <option value="">Please choose you city</option>
                      <option value="Gujar Khan">Gujar Khan</option>
                      <option value="Rawalpindi">Rawalpindi</option>
                      <option value="Islamabad">Islamabad</option>
                      <option value="Lahore">Lahore</option>
                      <option value="Karachi">Karachi</option>
                    </select>
                  </div>
                </div>

                {/* Building/House No + Area */}
                <div
                  style={{ display: "flex", gap: "15px", marginBottom: "15px" }}
                >
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
                      onChange={(e) =>
                        handleInputChange("houseNo", e.target.value)
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
                      Area
                    </label>
                    <select
                      value={formData.area}
                      onChange={(e) =>
                        handleInputChange("area", e.target.value)
                      }
                      disabled={!formData.city} // Disable until city is selected
                      style={{
                        width: "100%",
                        padding: "10px 12px",
                        border: "1px solid #ddd",
                        borderRadius: "4px",
                        outline: "none",
                        fontSize: "14px",
                        backgroundColor: formData.city ? "white" : "#f0f0f0", // grey background if disabled
                        boxSizing: "border-box",
                      }}
                    >
                      <option value="">Please choose you area</option>
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
                    onChange={(e) =>
                      handleInputChange("address", e.target.value)
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

                {/* Address Field (textarea) */}
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
                    required
                    value={formData.addressDetail}
                    onChange={(e) =>
                      handleInputChange("addressDetail", e.target.value)
                    }
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
                      type="button"
                      onClick={() =>
                        handleInputChange("deliveryLabel", "OFFICE")
                      }
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
                          formData.deliveryLabel === "OFFICE"
                            ? "#f57224"
                            : "#666",
                        cursor: "pointer",
                        borderRadius: "4px",
                        fontSize: "14px",
                        fontWeight: "500",
                      }}
                    >
                      📋 OFFICE
                    </button>
                    <button
                      type="button"
                      onClick={() => handleInputChange("deliveryLabel", "HOME")}
                      style={{
                        flex: 1,
                        padding: "10px 15px",
                        border:
                          formData.deliveryLabel === "HOME"
                            ? "2px solid #f57224"
                            : "1px solid #ddd",
                        backgroundColor:
                          formData.deliveryLabel === "HOME"
                            ? "#fff5f0"
                            : "#f9f9f9",
                        color:
                          formData.deliveryLabel === "HOME"
                            ? "#f57224"
                            : "#666",
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
                  type="button"
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
            )}
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
                type="button"
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
                type="button"
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

          {/* Order Summary Section */}
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
                  src={getImageUrl(item.images)}
                  alt={item.title || "Product"}
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "cover",
                    border: "1px solid #e5e5e5",
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
                  Items Total ({cart.length} items)
                </span>
                <span style={{ fontSize: "14px", fontWeight: "600" }}>
                  Rs. {subtotal.toLocaleString()}
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
                  Rs. {deliveryFee}
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
                  style={{ fontSize: "16px", fontWeight: "600", color: "#333" }}
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
                  Rs. {total.toLocaleString()}
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
              type="button"
              onClick={handleProceedToPay}
              disabled={!isSaved}
              style={{
                width: "100%",
                padding: "15px",
                backgroundColor: "#f57224",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: isSaved ? "pointer" : "not-allowed",
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
