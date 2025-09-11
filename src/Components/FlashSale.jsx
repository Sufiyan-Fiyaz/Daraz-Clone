import React from "react";
import { useNavigate } from "react-router-dom"; // ✅ import navigate
import products from "./ProductData"; // adjust path

// Shuffle helper
const getRandomProducts = (count) => {
  const shuffled = [...products].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

const FlashSale = () => {
  const randomProducts = getRandomProducts(6);
  const navigate = useNavigate(); // ✅ initialize navigate

  const handleProductClick = (id) => {
    navigate(`/product/${id}`); // ✅ navigate to product detail
  };

  return (
    <div
      style={{
        marginTop: "30px",
        backgroundColor: "#fff",
        borderRadius: "8px",
        padding: "20px",
        boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
      }}
    >
      {/* Header */}
      <p style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "15px" }}>
        Flash Sale
      </p>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px solid #eee",
          paddingBottom: "10px",
          marginBottom: "15px",
        }}
      >
        <p style={{ color: "#f85606", fontSize: "18px", fontWeight: "bold" }}>
          On Sale Now
        </p>
        <button
          style={{
            background: "transparent",
            border: "1px solid #f85606",
            color: "#f85606",
            padding: "6px 12px",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: "bold",
          }}
        >
          SHOP ALL PRODUCTS
        </button>
      </div>

      {/* Product Carousel */}
      <div
        style={{
          display: "flex",
          overflowX: "auto",
          gap: "12px",
          scrollbarWidth: "none",
        }}
      >
        {randomProducts.map((product) => (
          <div
            key={product.id}
            onClick={() => handleProductClick(product.id)} // ✅ logic added
            style={{
              minWidth: "180px",
              maxWidth: "200px",
              border: "1px solid #eee",
              borderRadius: "6px",
              backgroundColor: "#fff",
              cursor: "pointer",
              flexShrink: 0,
              transition: "all 0.3s ease",
            }}
          >
            <img
              src={product.image}
              alt={product.title}
              style={{
                width: "100%",
                height: "160px",
                objectFit: "cover",
                borderBottom: "1px solid #eee",
              }}
            />
            <div style={{ padding: "8px" }}>
              <p
                style={{
                  fontSize: "13px",
                  color: "#333",
                  height: "36px",
                  overflow: "hidden",
                }}
              >
                {product.title}
              </p>
              <p
                style={{
                  fontSize: "15px",
                  fontWeight: "bold",
                  color: "#f85606",
                  margin: "4px 0",
                }}
              >
                {product.currentPrice}
              </p>
              <div style={{ fontSize: "12px", color: "#888" }}>
                <span style={{ textDecoration: "line-through" }}>
                  {product.originalPrice}
                </span>{" "}
                <span style={{ color: "#f85606", fontWeight: "bold" }}>
                  {product.discount}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FlashSale;
