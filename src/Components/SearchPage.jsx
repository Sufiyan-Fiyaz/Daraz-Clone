// src/SearchPage.jsx
import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";

const SearchPage = () => {
  const { search } = useLocation();
  const query = new URLSearchParams(search).get("q")?.toLowerCase() || "";

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const baseURL = "https://localhost:7292"; // apna backend ka base URL

  // API call
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${baseURL}/api/product`);
        const data = await res.json();

        // .NET API aksar $values me deta hai
        const productsArray = data.$values || data || [];
        setProducts(productsArray);
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Filter products based on search query
  const filteredProduct = Array.isArray(products)
    ? products.filter((p) => p.title?.toLowerCase().includes(query))
    : [];

  return (
    <div
      style={{
        padding: "20px",
        backgroundColor: "#f5f5f5",
        minHeight: "100vh",
      }}
    >
      <h2 style={{ marginBottom: "20px", fontSize: "20px", color: "#333" }}>
        Search Results for "<span style={{ color: "#f57224" }}>{query}</span>"
      </h2>

      {loading ? (
        <p style={{ color: "#666", fontSize: "16px" }}>Loading...</p>
      ) : filteredProduct.length === 0 ? (
        <p style={{ color: "#666", fontSize: "16px" }}>No products found.</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
            gap: "20px",
          }}
        >
          {filteredProduct.map((item) => (
            <Link
              key={item.id}
              to={`/product/${item.id}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <div
                style={{
                  border: "1px solid #eee",
                  borderRadius: "6px",
                  background: "#fff",
                  padding: "10px",
                  transition: "0.3s ease",
                  cursor: "pointer",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.03)";
                  e.currentTarget.style.boxShadow =
                    "0 4px 12px rgba(0,0,0,0.15)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.boxShadow =
                    "0 1px 3px rgba(0,0,0,0.1)";
                }}
              >
                {/* ✅ Fix for image */}
                <img
                  src={
                    item.images
                      ? Array.isArray(item.images)
                        ? `${baseURL}${item.images[0]?.imageUrl}`
                        : `${baseURL}${item.images.$values?.[0]?.imageUrl}`
                      : "/placeholder.png"
                  }
                  alt={item.title}
                  style={{
                    width: "100%",
                    height: "180px",
                    objectFit: "cover",
                    borderRadius: "4px",
                  }}
                />
                <h4
                  style={{
                    fontSize: "14px",
                    margin: "10px 0 6px",
                    color: "#333",
                    lineHeight: "18px",
                    height: "36px",
                    overflow: "hidden",
                  }}
                >
                  {item.title}
                </h4>
                <p
                  style={{
                    color: "#f57224",
                    fontWeight: "bold",
                    fontSize: "16px",
                    marginBottom: "5px",
                  }}
                >
                  Rs. {item.currentPrice}
                </p>
                {item.originalPrice && (
                  <p
                    style={{
                      fontSize: "13px",
                      textDecoration: "line-through",
                      color: "#999",
                      margin: 0,
                    }}
                  >
                    Rs. {item.originalPrice}
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchPage;
