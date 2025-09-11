import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import products from "./ProductData";
import {
  Star,
  Heart,
  Share2,
  MapPin,
  Shield,
  Package,
  MessageCircle,
  QrCode,
  ChevronLeft,
} from "lucide-react";
import { useCart } from "./CartContext.jsx";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedColor, setSelectedColor] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  const product = products.find((p) => p.id === parseInt(id));
  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
      // alert(`${product.title} added to cart!`);
    }
  };

  if (!product) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          backgroundColor: "#f5f5f5",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <h2
            style={{
              fontSize: "24px",
              fontWeight: "bold",
              color: "#333",
              marginBottom: "16px",
            }}
          >
            Product not found
          </h2>
          <button
            onClick={() => navigate(-1)}
            style={{
              backgroundColor: "#f57224",
              color: "white",
              padding: "10px 24px",
              borderRadius: "4px",
              border: "none",
              cursor: "pointer",
              fontSize: "14px",
            }}
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        size={14}
        style={{
          fill:
            i < fullStars || (i === fullStars && hasHalfStar)
              ? "#ffd700"
              : "none",
          color:
            i < fullStars || (i === fullStars && hasHalfStar)
              ? "#ffd700"
              : "#ddd",
        }}
      />
    ));
  };

  const colorOptions = [
    {
      name: "Multicolour",
      color: "linear-gradient(135deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4)",
    },
    { name: "Black", color: "#333333" },
    { name: "White", color: "#ffffff" },
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* Header with back button */}
      <div
        style={{
          backgroundColor: "white",
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
        }}
      >
        <div
          style={{ maxWidth: "1200px", margin: "0 auto", padding: "12px 16px" }}
        >
          <button
            onClick={() => navigate(-1)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              color: "#666",
              backgroundColor: "transparent",
              border: "none",
              cursor: "pointer",
              fontSize: "14px",
            }}
          >
            <ChevronLeft size={20} />
            Back to Products
          </button>
        </div>
      </div>

      {/* Breadcrumb
      <div
        style={{
          backgroundColor: "white",
          padding: "8px 16px",
          fontSize: "14px",
          color: "#666",
          borderBottom: "1px solid #eee",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <span style={{ color: "#3b82f6", cursor: "pointer" }}>
            TV, Audio / Video, Gaming & Wearables
          </span>
          <span style={{ margin: "0 8px" }}>›</span>
          <span style={{ color: "#3b82f6", cursor: "pointer" }}>Audio</span>
          <span style={{ margin: "0 8px" }}>›</span>
          <span style={{ color: "#3b82f6", cursor: "pointer" }}>
            Headphones & Headsets
          </span>
          <span style={{ margin: "0 8px" }}>›</span>
          <span style={{ color: "#3b82f6", cursor: "pointer" }}>
            Headphones & Headsets Accessories
          </span>
          <span style={{ margin: "0 8px" }}>›</span>
          <span>{product.title}</span>
        </div>
      </div> */}

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "16px" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 300px",
            gap: "24px",
          }}
        >
          {/* Left Column - Product Images */}
          <div
            style={{
              backgroundColor: "white",
              borderRadius: "8px",
              padding: "16px",
              boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
            }}
          >
            <div style={{ position: "relative", marginBottom: "16px" }}>
              <img
                src={product.image}
                alt={product.title}
                style={{
                  width: "100%",
                  height: "400px",
                  objectFit: "contain",
                  borderRadius: "8px",
                  backgroundColor: "#f8f8f8",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  top: "16px",
                  right: "16px",
                  display: "flex",
                  gap: "8px",
                }}
              >
                <button
                  style={{
                    padding: "8px",
                    backgroundColor: "white",
                    borderRadius: "50%",
                    border: "none",
                    cursor: "pointer",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                  }}
                >
                  <Share2 size={20} style={{ color: "#666" }} />
                </button>
                <button
                  style={{
                    padding: "8px",
                    backgroundColor: "white",
                    borderRadius: "50%",
                    border: "none",
                    cursor: "pointer",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                  }}
                >
                  <Heart size={20} style={{ color: "#666" }} />
                </button>
              </div>
            </div>

            {/* Thumbnail images */}
            <div style={{ display: "flex", gap: "8px", overflowX: "auto" }}>
              {[1, 2, 3, 4, 5].map((i) => (
                <img
                  key={i}
                  src={product.image}
                  alt={`Product view ${i}`}
                  style={{
                    width: "64px",
                    height: "64px",
                    objectFit: "contain",
                    borderRadius: "4px",
                    border: i === 1 ? "2px solid #f57224" : "2px solid #e5e5e5",
                    cursor: "pointer",
                    flexShrink: 0,
                    backgroundColor: "#f8f8f8",
                  }}
                />
              ))}
            </div>
          </div>

          {/* Middle Column - Product Info */}
          <div
            style={{
              backgroundColor: "white",
              borderRadius: "8px",
              padding: "16px",
              boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
            }}
          >
            <h1
              style={{
                fontSize: "20px",
                fontWeight: "500",
                color: "#333",
                marginBottom: "12px",
                lineHeight: "1.4",
              }}
            >
              {product.title}
            </h1>

            {/* Rating */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginBottom: "16px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                {renderStars(product.rating)}
              </div>
              <span style={{ fontSize: "14px", color: "#3b82f6" }}>
                Ratings {product.reviews}
              </span>
            </div>

            {/* Brand */}
            <div style={{ marginBottom: "16px" }}>
              <span style={{ fontSize: "14px", color: "#666" }}>Brand: </span>
              <span style={{ fontSize: "14px", color: "#3b82f6" }}>
                {product.brand || "No Brand"}
              </span>
              <span style={{ fontSize: "14px", color: "#666" }}> | </span>
              <span style={{ fontSize: "14px", color: "#3b82f6" }}>
                More Audio from {product.brand || "No Brand"}
              </span>
            </div>

            {/* Price */}
            {/* Price */}
            <div style={{ marginBottom: "24px" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  gap: "12px",
                  flexWrap: "wrap",
                }}
              >
                <span
                  style={{
                    fontSize: "32px",
                    fontWeight: "500",
                    color: "#f57224",
                  }}
                >
                  {product.currentPrice}
                </span>

                {product.originalPrice && (
                  <span
                    style={{
                      fontSize: "18px",
                      color: "#999",
                      textDecoration: "line-through",
                    }}
                  >
                    {product.originalPrice}
                  </span>
                )}

                {product.discount && (
                  <span
                    style={{
                      fontSize: "14px",
                      color: "#f57224",
                      fontWeight: "500",
                    }}
                  >
                    {product.discount}
                  </span>
                )}
              </div>
            </div>

            {/* Color Options */}
            <div style={{ marginBottom: "16px" }}>
              <span
                style={{
                  fontSize: "14px",
                  fontWeight: "500",
                  color: "#333",
                  display: "block",
                  marginBottom: "8px",
                }}
              >
                Color Family: Multicolour
              </span>
              <div style={{ display: "flex", gap: "8px" }}>
                <button
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "4px",
                    border: "4px solid #f57224",
                    background:
                      "linear-gradient(135deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4)",
                    cursor: "pointer",
                  }}
                />
              </div>
            </div>

            {/* Quantity */}
            <div style={{ marginBottom: "24px" }}>
              <span
                style={{
                  fontSize: "14px",
                  fontWeight: "500",
                  color: "#333",
                  display: "block",
                  marginBottom: "8px",
                }}
              >
                Quantity
              </span>
              <div
                style={{ display: "flex", alignItems: "center", gap: "12px" }}
              >
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  style={{
                    width: "32px",
                    height: "32px",
                    border: "1px solid #ddd",
                    borderRadius: "4px",
                    backgroundColor: "white",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  −
                </button>
                <span
                  style={{
                    width: "48px",
                    textAlign: "center",
                    fontWeight: "500",
                  }}
                >
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  style={{
                    width: "32px",
                    height: "32px",
                    border: "1px solid #ddd",
                    borderRadius: "4px",
                    backgroundColor: "white",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  +
                </button>
              </div>
            </div>

            {/* Buy Now and Add to Cart Buttons */}
            <div style={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
              <button
                style={{
                  flex: "1",
                  padding: "12px",
                  backgroundColor: "#1DB5E7",
                  color: "white",
                  borderRadius: "4px",
                  border: "none",
                  cursor: "pointer",
                  fontWeight: "500",
                  fontSize: "14px",
                }}
              >
                Buy Now
              </button>
              <button
                onClick={handleAddToCart} // 👈 bas yeh line
                style={{
                  flex: "1",
                  padding: "12px",
                  backgroundColor: "#f57224",
                  color: "white",
                  borderRadius: "4px",
                  border: "none",
                  cursor: "pointer",
                  fontWeight: "500",
                  fontSize: "14px",
                }}
              >
                Add to Cart
              </button>
            </div>
          </div>

          {/* Right Column - Delivery & Seller Info */}
          <div
            style={{ display: "flex", flexDirection: "column", gap: "16px" }}
          >
            {/* Delivery Options */}
            <div
              style={{
                backgroundColor: "white",
                borderRadius: "8px",
                padding: "16px",
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
              }}
            >
              <h3
                style={{
                  fontWeight: "500",
                  color: "#333",
                  marginBottom: "12px",
                  fontSize: "16px",
                }}
              >
                Delivery Options
              </h3>
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "12px",
                  marginBottom: "16px",
                }}
              >
                <MapPin
                  size={20}
                  style={{ color: "#999", marginTop: "2px", flexShrink: 0 }}
                />
                <div>
                  <div
                    style={{
                      fontSize: "14px",
                      fontWeight: "500",
                      marginBottom: "4px",
                    }}
                  >
                    Sindh, Karachi - Gulshan-e-Iqbal, Block 15
                  </div>
                  <button
                    style={{
                      color: "#3b82f6",
                      fontSize: "14px",
                      backgroundColor: "transparent",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    CHANGE
                  </button>
                </div>
              </div>

              {/* Standard Delivery */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  marginBottom: "12px",
                }}
              >
                <Package size={20} style={{ color: "#999", flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: "14px", fontWeight: "500" }}>
                    Standard Delivery
                  </div>
                  <div style={{ fontSize: "12px", color: "#666" }}>
                    Guaranteed by 16 Sep
                  </div>
                </div>
                <div
                  style={{ fontSize: "14px", fontWeight: "500", color: "#333" }}
                >
                  Rs. 125
                </div>
              </div>

              {/* Cash on Delivery */}
              <div
                style={{ display: "flex", alignItems: "center", gap: "12px" }}
              >
                <div
                  style={{
                    width: "20px",
                    height: "20px",
                    backgroundColor: "#f57224",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "12px",
                    color: "white",
                    fontWeight: "bold",
                    flexShrink: 0,
                  }}
                >
                  ₹
                </div>
                <span style={{ fontSize: "14px", fontWeight: "500" }}>
                  Cash on Delivery Available
                </span>
              </div>
            </div>

            {/* Return & Warranty */}
            <div
              style={{
                backgroundColor: "white",
                borderRadius: "8px",
                padding: "16px",
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
              }}
            >
              <h3
                style={{
                  fontWeight: "500",
                  color: "#333",
                  marginBottom: "12px",
                  fontSize: "16px",
                }}
              >
                Return & Warranty
              </h3>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                }}
              >
                <div
                  style={{ display: "flex", alignItems: "center", gap: "12px" }}
                >
                  <div
                    style={{
                      width: "20px",
                      height: "20px",
                      backgroundColor: "#e5e5e5",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <Shield size={12} style={{ color: "#666" }} />
                  </div>
                  <span style={{ fontSize: "14px" }}>14 days easy return</span>
                </div>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "12px" }}
                >
                  <div
                    style={{
                      width: "20px",
                      height: "20px",
                      backgroundColor: "#e5e5e5",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <Package size={12} style={{ color: "#666" }} />
                  </div>
                  <span style={{ fontSize: "14px" }}>
                    Warranty not available
                  </span>
                </div>
              </div>
            </div>

            {/* QR Code */}
            <div
              style={{
                backgroundColor: "white",
                borderRadius: "8px",
                padding: "16px",
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  backgroundColor: "#f5f5f5",
                  padding: "16px",
                  borderRadius: "8px",
                  marginBottom: "12px",
                  display: "inline-block",
                }}
              >
                <QrCode size={60} style={{ color: "#999" }} />
              </div>
              <div
                style={{ fontSize: "14px", color: "#666", marginBottom: "8px" }}
              >
                Download app to enjoy exclusive discounts!
              </div>
              <div style={{ fontSize: "12px", color: "#999" }}>
                Scan with mobile
              </div>
            </div>

            {/* Seller Info */}
            <div
              style={{
                backgroundColor: "white",
                borderRadius: "8px",
                padding: "16px",
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "12px",
                }}
              >
                <span style={{ fontSize: "14px", color: "#666" }}>Sold by</span>
                <button
                  style={{
                    backgroundColor: "#f57224",
                    color: "white",
                    padding: "8px 16px",
                    borderRadius: "4px",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "14px",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <MessageCircle size={16} />
                  Chat Now
                </button>
              </div>
              <div
                style={{
                  fontWeight: "500",
                  color: "#333",
                  marginBottom: "12px",
                  fontSize: "16px",
                }}
              >
                Pak Deals pk (Karachi)
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(2, 1fr)",
                  gap: "16px",
                  textAlign: "center",
                  marginBottom: "16px",
                }}
              >
                <div>
                  <div
                    style={{
                      fontSize: "20px",
                      fontWeight: "bold",
                      color: "#333",
                    }}
                  >
                    78%
                  </div>
                  <div
                    style={{
                      fontSize: "12px",
                      color: "#666",
                      lineHeight: "1.2",
                    }}
                  >
                    Positive Seller Ratings
                  </div>
                </div>
                <div>
                  <div
                    style={{
                      fontSize: "20px",
                      fontWeight: "bold",
                      color: "#333",
                    }}
                  >
                    99%
                  </div>
                  <div
                    style={{
                      fontSize: "12px",
                      color: "#666",
                      lineHeight: "1.2",
                    }}
                  >
                    Ship on Time
                  </div>
                </div>
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(2, 1fr)",
                  gap: "16px",
                  textAlign: "center",
                  marginBottom: "16px",
                }}
              >
                <div>
                  <div
                    style={{
                      fontSize: "20px",
                      fontWeight: "bold",
                      color: "#999",
                    }}
                  >
                    -
                  </div>
                  <div
                    style={{
                      fontSize: "12px",
                      color: "#666",
                      lineHeight: "1.2",
                    }}
                  >
                    Chat Response Rate
                  </div>
                </div>
                <div>{/* Empty space for alignment */}</div>
              </div>
              <button
                style={{
                  width: "100%",
                  color: "#3b82f6",
                  fontSize: "14px",
                  fontWeight: "500",
                  backgroundColor: "transparent",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                GO TO STORE
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
