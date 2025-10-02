import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Star, ChevronLeft } from "lucide-react";
import { useCart } from "../Cart/CartContext.jsx";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedColor, setSelectedColor] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  const baseURL = "https://localhost:7292";

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`${baseURL}/api/Product/${id}`);
        const data = await res.json();

        // Normalize arrays from $values
        const fixedData = {
          ...data,
          images: data.images?.$values || [],
          colors: data.colors?.$values || [],
          storageOptions: data.storageOptions?.$values || [],
          deliveryOptions:
            data.deliveryOptions?.$values?.[0] || data.deliveryOptions || null,
        };

        setProduct(fixedData);
        setSelectedColor(fixedData.colors?.[0] || null);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
    }
  };

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

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>Loading...</div>
    );
  }

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
                src={`${baseURL}${product.images?.[0]?.imageUrl}`} // ✅ yahan baseURL add karo
                alt={product.title}
                style={{
                  width: "100%",
                  height: "400px",
                  objectFit: "contain",
                  borderRadius: "8px",
                  backgroundColor: "#f8f8f8",
                }}
              />
            </div>

            {/* Thumbnail images */}
            <div style={{ display: "flex", gap: "8px", overflowX: "auto" }}>
              {product.images?.map((img, idx) => (
                <img
                  key={idx}
                  src={`${baseURL}${img.imageUrl}`} // ✅ yahan bhi baseURL add karo
                  alt="thumb"
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "4px",
                    border: "1px solid #ccc",
                    cursor: "pointer",
                    objectFit: "cover",
                  }}
                  onClick={() => {
                    const newImages = [...product.images];
                    [newImages[0], newImages[idx]] = [
                      newImages[idx],
                      newImages[0],
                    ];
                    setProduct({ ...product, images: newImages });
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
            </div>

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
                  Rs. {product.currentPrice}
                </span>

                {product.originalPrice && (
                  <span
                    style={{
                      fontSize: "18px",
                      color: "#999",
                      textDecoration: "line-through",
                    }}
                  >
                    Rs. {product.originalPrice}
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
                Color Family
              </span>
              <div style={{ display: "flex", gap: "8px" }}>
                {product.colors?.map((c, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedColor(c)}
                    style={{
                      width: "48px",
                      height: "48px",
                      borderRadius: "4px",
                      border:
                        selectedColor?.id === c.id
                          ? "4px solid #f57224"
                          : "2px solid #ccc",
                      backgroundColor: c.colorCode,
                      cursor: "pointer",
                    }}
                  />
                ))}
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

            {/* Buy Now and Add to Cart */}
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
                onClick={handleAddToCart}
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
              <div style={{ fontSize: "14px" }}>
                {product.deliveryOptions?.standardDeliveryText} –{" "}
                {product.deliveryOptions?.standardDeliveryTime} (
                {product.deliveryOptions?.standardDeliveryPrice})
              </div>
              {product.deliveryOptions?.cashOnDelivery && (
                <div
                  style={{ marginTop: "8px", fontSize: "14px", color: "green" }}
                >
                  Cash on Delivery Available
                </div>
              )}
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
              <div style={{ fontSize: "14px" }}>
                {product.warranty?.easyReturn}
              </div>
              <div style={{ fontSize: "14px" }}>
                {product.warranty?.brandWarranty}
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
              <h3
                style={{
                  fontWeight: "500",
                  color: "#333",
                  marginBottom: "12px",
                  fontSize: "16px",
                }}
              >
                Seller Info
              </h3>
              <div style={{ fontSize: "14px" }}>
                {product.seller?.sellerName}
              </div>
              <div style={{ fontSize: "14px", color: "#666" }}>
                {product.seller?.sellerType}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
