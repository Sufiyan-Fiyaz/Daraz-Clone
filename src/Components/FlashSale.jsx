import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const FlashSale = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // ✅ loader state
  const navigate = useNavigate();
  const baseURL = "https://localhost:7292"; // ✅ baseURL without trailing slash

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${baseURL}/api/product`);
        const data = await res.json();

        const productsArray = data.$values || data || [];
        const shuffled = [...productsArray].sort(() => 0.5 - Math.random());
        setProducts(shuffled.slice(0, 6));
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false); // ✅ stop loader after fetch
      }
    };
    fetchProducts();
  }, []);

  const handleProductClick = (id) => {
    navigate(`/product/${id}`);
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

      {/* Loader */}
      {loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            padding: "40px 0",
          }}
        >
          <img
            src="https://img.lazcdn.com/g/tps/imgextra/i1/O1CN01dmW7OR1TUNRMBH0P4_!!6000000002385-1-tps-200-200.gif"
            alt="Loading..."
            style={{ width: "80px", height: "80px" }}
          />
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            overflowX: "auto",
            gap: "12px",
            scrollbarWidth: "none",
          }}
        >
          {products.map((product, index) => (
            <div
              key={product.id ?? index}
              onClick={() => handleProductClick(product.id)}
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
                src={
                  product.images
                    ? Array.isArray(product.images)
                      ? `${baseURL}${product.images[0]?.imageUrl}`
                      : `${baseURL}${product.images.$values?.[0]?.imageUrl}`
                    : "/placeholder.png"
                }
                alt={product.title || "Product"}
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
                  Rs. {product.currentPrice}
                </p>
                <div style={{ fontSize: "12px", color: "#888" }}>
                  <span style={{ textDecoration: "line-through" }}>
                    Rs. {product.originalPrice}
                  </span>{" "}
                  <span style={{ color: "#f85606", fontWeight: "bold" }}>
                    {product.discount || "20% OFF"}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FlashSale;
