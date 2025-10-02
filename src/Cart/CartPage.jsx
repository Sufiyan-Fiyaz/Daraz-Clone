import React, { useState, useEffect } from "react";
import { useCart } from "../Cart/CartContext"; // <-- CartProvider hook
import { useNavigate } from "react-router-dom";

// Helper: Convert "Rs.199,999" -> 199999
const parsePrice = (price) => {
  if (!price) return 0;
  return typeof price === "number"
    ? price
    : parseFloat(price.toString().replace(/[^\d.-]/g, ""));
};

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const [selectedItems, setSelectedItems] = useState([]);
  const [voucherCode, setVoucherCode] = useState("");
  const navigate = useNavigate();

  const BASE_URL = "https://localhost:7292"; // ✅ use same as flashsale/productdetail

  useEffect(() => {
    // select all items when cart changes
    setSelectedItems(cart.map((item) => item.id));
  }, [cart]);

  useEffect(() => {
    console.log(
      "Cart item images:",
      cart.map((c) => c.images)
    );
  }, [cart]);

  const getImageUrl = (images) => {
    // Recursive function to extract first valid URL
    const extractUrl = (obj) => {
      if (!obj) return null;

      if (typeof obj === "string")
        return obj.startsWith("http") ? obj : `${BASE_URL}${obj}`;

      if (obj.imageUrl && typeof obj.imageUrl === "string")
        return obj.imageUrl.startsWith("http")
          ? obj.imageUrl
          : `${BASE_URL}${obj.imageUrl}`;

      // If obj is array, try first element
      if (Array.isArray(obj) && obj.length > 0) return extractUrl(obj[0]);

      // If obj has $values array
      if (obj.$values && Array.isArray(obj.$values) && obj.$values.length > 0)
        return extractUrl(obj.$values[0]);

      return null;
    };

    const url = extractUrl(images);
    return url || "/placeholder.png";
  };

  // Select / Unselect All
  const handleSelectAll = () => {
    if (selectedItems.length === cart.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(cart.map((item) => item.id));
    }
  };

  // Select Single Item
  const handleSelectItem = (id) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  // Selected Cart Items
  const selectedCartItems = cart.filter((item) =>
    selectedItems.includes(item.id)
  );

  // Subtotal
  const subtotal = selectedCartItems.reduce(
    (sum, item) => sum + parsePrice(item.currentPrice) * item.quantity,
    0
  );

  // Quantity Change
  const handleQuantityChange = (id, qty) => {
    if (qty >= 1) updateQuantity(id, qty);
  };

  // Delete Selected
  const handleDeleteSelected = () => {
    selectedItems.forEach((id) => removeFromCart(id));
    setSelectedItems([]);
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
        }}
      >
        {/* Left Side - Cart Items */}
        <div style={{ flex: 1 }}>
          {/* Select All Header */}
          <div
            style={{
              backgroundColor: "white",
              padding: "15px 20px",
              marginBottom: "1px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              fontSize: "12px",
              color: "#888",
              fontWeight: "500",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <input
                type="checkbox"
                checked={
                  selectedItems.length === cart.length && cart.length > 0
                }
                onChange={handleSelectAll}
                style={{ width: "16px", height: "16px" }}
              />
              <span>
                SELECT ALL ({cart.length} ITEM{cart.length !== 1 ? "S" : ""})
              </span>
            </div>
            <button
              onClick={handleDeleteSelected}
              disabled={selectedItems.length === 0}
              style={{
                background: "transparent",
                border: "none",
                color: selectedItems.length > 0 ? "#f57224" : "#ccc",
                fontSize: "12px",
                cursor: selectedItems.length > 0 ? "pointer" : "not-allowed",
                display: "flex",
                alignItems: "center",
                gap: "5px",
                fontWeight: "500",
              }}
            >
              DELETE
            </button>
          </div>

          {/* Cart Items */}
          {cart.length === 0 ? (
            <div
              style={{
                backgroundColor: "white",
                padding: "60px 20px",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontSize: "60px",
                  marginBottom: "20px",
                  color: "#ddd",
                }}
              >
                🛒
              </div>
              <h3 style={{ color: "#757575", marginBottom: "10px" }}>
                Your cart is empty
              </h3>
              <p style={{ color: "#9e9e9e", fontSize: "14px" }}>
                Browse categories and discover our best deals!
              </p>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.id} style={{ marginBottom: "1px" }}>
                {/* Seller Header */}
                <div
                  style={{
                    backgroundColor: "white",
                    padding: "12px 20px",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    fontSize: "14px",
                    color: "#333",
                    borderBottom: "1px solid #f0f0f0",
                  }}
                >
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      height: "16px",
                      marginRight: "8px",
                    }}
                  >
                    <img
                      src="https://img.lazcdn.com/g/tps/imgextra/i3/O1CN01y23xZt1u7vnF19f2u_!!6000000005991-2-tps-72-72.png_2200x2200q75.png_.webp"
                      alt="store"
                      style={{
                        width: "16px",
                        height: "16px",
                        objectFit: "contain",
                        display: "block",
                      }}
                    />
                  </span>
                  {item.seller?.name || "Unknown Seller"}
                </div>

                {/* Product Item */}
                <div
                  style={{
                    backgroundColor: "white",
                    padding: "20px",
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "15px",
                  }}
                >
                  <input
                    type="checkbox"
                    checked={selectedItems.includes(item.id)}
                    onChange={() => handleSelectItem(item.id)}
                    style={{ width: "16px", height: "16px", marginTop: "5px" }}
                  />

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
                    <h4
                      style={{
                        margin: "0 0 8px 0",
                        fontSize: "14px",
                        color: "#333",
                        lineHeight: "1.4",
                        fontWeight: "400",
                      }}
                    >
                      {item.title}
                    </h4>

                    <div
                      style={{
                        fontSize: "12px",
                        color: "#999",
                        marginBottom: "12px",
                      }}
                    >
                      {item.brand || "No Brand"}, Color Family:{" "}
                      {item.colorFamily || "Multicolor"}
                    </div>

                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        marginBottom: "15px",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "18px",
                          fontWeight: "600",
                          color: "#f57224",
                        }}
                      >
                        Rs. {parsePrice(item.currentPrice).toLocaleString()}
                      </span>
                      <span
                        style={{
                          fontSize: "13px",
                          color: "#999",
                          textDecoration: "line-through",
                        }}
                      >
                        Rs. {parsePrice(item.originalPrice).toLocaleString()}
                      </span>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <button
                          onClick={() =>
                            handleQuantityChange(item.id, item.quantity - 1)
                          }
                          disabled={item.quantity <= 1}
                          style={{
                            width: "30px",
                            height: "30px",
                            border: "1px solid #ddd",
                            background: "#fff",
                            cursor:
                              item.quantity <= 1 ? "not-allowed" : "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "16px",
                            borderRadius: "0",
                          }}
                        >
                          −
                        </button>
                        <span
                          style={{
                            width: "50px",
                            height: "30px",
                            border: "1px solid #ddd",
                            borderLeft: "none",
                            borderRight: "none",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "14px",
                            backgroundColor: "#fff",
                          }}
                        >
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            handleQuantityChange(item.id, item.quantity + 1)
                          }
                          style={{
                            width: "30px",
                            height: "30px",
                            border: "1px solid #ddd",
                            background: "#fff",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "16px",
                            borderRadius: "0",
                          }}
                        >
                          +
                        </button>
                      </div>

                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "20px",
                        }}
                      >
                        <button
                          style={{
                            background: "transparent",
                            border: "none",
                            color: "#999",
                            cursor: "pointer",
                            fontSize: "18px",
                            padding: "0",
                          }}
                        >
                          ♡
                        </button>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          style={{
                            background: "transparent",

                            border: "none",
                            color: "#999",
                            cursor: "pointer",
                            fontSize: "16px",
                            padding: "0",
                          }}
                        >
                          🗑
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Right Side - Order Summary */}
        <div style={{ width: "350px" }}>
          <div
            style={{
              backgroundColor: "white",
              padding: "25px",
            }}
          >
            <h3
              style={{
                margin: "0 0 25px 0",
                fontSize: "18px",
                fontWeight: "500",
                color: "#333",
              }}
            >
              Order Summary
            </h3>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "12px",
                fontSize: "14px",
                color: "#666",
              }}
            >
              <span>
                Subtotal (
                {selectedCartItems.reduce((s, i) => s + i.quantity, 0)} items)
              </span>
              <span style={{ color: "#333", fontWeight: "500" }}>
                Rs.{" "}
                {selectedCartItems.length > 0 ? subtotal.toLocaleString() : "0"}
              </span>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "25px",
                fontSize: "14px",
                color: "#666",
              }}
            >
              <span>Shipping Fee</span>
              <span style={{ color: "#333", fontWeight: "500" }}>Rs. 0</span>
            </div>

            <div style={{ marginBottom: "25px" }}>
              <input
                type="text"
                placeholder="Enter Voucher Code"
                value={voucherCode}
                onChange={(e) => setVoucherCode(e.target.value)}
                style={{
                  width: "100%",
                  padding: "12px",
                  border: "1px solid #ddd",
                  fontSize: "14px",
                  marginBottom: "12px",
                  boxSizing: "border-box",
                  borderRadius: "0",
                }}
              />
              <button
                style={{
                  width: "100%",
                  padding: "12px",
                  backgroundColor: "#26a9e0",
                  color: "white",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "14px",
                  fontWeight: "600",
                  borderRadius: "0",
                }}
              >
                APPLY
              </button>
            </div>

            <div
              style={{
                borderTop: "1px solid #e5e5e5",
                paddingTop: "20px",
                display: "flex",
                justifyContent: "space-between",
                fontSize: "18px",
                fontWeight: "500",
                marginBottom: "25px",
              }}
            >
              <span style={{ color: "#333" }}>Total</span>
              <span style={{ color: "#f57224" }}>
                Rs.{" "}
                {selectedCartItems.length > 0 ? subtotal.toLocaleString() : "0"}
              </span>
            </div>

            <button
              disabled={selectedItems.length === 0}
              onClick={() => navigate("/checkout")}
              style={{
                width: "100%",
                padding: "15px",
                backgroundColor: selectedItems.length > 0 ? "#f57224" : "#ddd",
                color: "white",
                border: "none",
                cursor: selectedItems.length > 0 ? "pointer" : "not-allowed",
                fontSize: "14px",
                fontWeight: "600",
                borderRadius: "0",
              }}
            >
              PROCEED TO CHECKOUT({selectedItems.length})
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
