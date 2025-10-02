import React, { useState, useEffect } from "react";
import { Star, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ProductGrid = () => {
  const [products, setProducts] = useState([]);
  const [visibleProducts, setVisibleProducts] = useState(12);
  const [loading, setLoading] = useState(true); // ✅ loader state
  const productsPerLoad = 12;
  const navigate = useNavigate();
  const baseURL = "https://localhost:7292";

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${baseURL}/api/Product`);
        const data = await res.json();

        const productsArray = Array.isArray(data) ? data : data.$values || [];
        setProducts(productsArray);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false); // ✅ stop loader
      }
    };
    fetchProducts();
  }, []);

  const handleProductClick = (id) => {
    navigate(`/product/${id}`);
  };

  const renderStars = (rating, reviews) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "4px",
          fontSize: "11px",
          color: "#757575",
          marginTop: "4px",
        }}
      >
        <div style={{ display: "flex", gap: "1px" }}>
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={10}
              style={{
                fill:
                  i < fullStars || (i === fullStars && hasHalfStar)
                    ? "#ffd700"
                    : "none",
                color:
                  i < fullStars || (i === fullStars && hasHalfStar)
                    ? "#ffd700"
                    : "#ddd",
                strokeWidth: 1,
              }}
            />
          ))}
        </div>
        <span style={{ marginLeft: "3px", fontSize: "10px" }}>({reviews})</span>
      </div>
    );
  };

  const handleLoadMore = () => {
    setVisibleProducts((prev) => prev + productsPerLoad);
  };

  const displayedProducts = products.slice(0, visibleProducts);
  const hasMoreProducts = visibleProducts < products.length;
  const allProductsLoaded = visibleProducts >= products.length;

  return (
    <div
      style={{
        backgroundColor: "#f5f5f5",
        padding: "0",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* Header */}
      <div
        style={{
          backgroundColor: "#fff",
          padding: "16px 20px",
          borderBottom: "1px solid #e0e0e0",
        }}
      >
        <h2
          style={{
            margin: "0",
            fontSize: "18px",
            fontWeight: "600",
            color: "#212121",
          }}
        >
          Just For You
        </h2>
      </div>

      {/* Loader */}
      {loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            padding: "50px 0",
          }}
        >
          <img
            src="https://img.lazcdn.com/g/tps/imgextra/i1/O1CN01dmW7OR1TUNRMBH0P4_!!6000000002385-1-tps-200-200.gif"
            alt="Loading..."
            style={{ width: "80px", height: "80px" }}
          />
        </div>
      ) : (
        <>
          {/* Product Grid */}
          <div
            style={{
              backgroundColor: "#fff",
              padding: "16px",
              display: "grid",
              gridTemplateColumns: "repeat(6, 1fr)",
              gap: "12px",
            }}
          >
            {displayedProducts.map((product) => (
              <div
                key={product.id}
                onClick={() => handleProductClick(product.id)}
                style={{
                  backgroundColor: "#fff",
                  border: "1px solid #f0f0f0",
                  borderRadius: "4px",
                  overflow: "hidden",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  position: "relative",
                  boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
                }}
              >
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    paddingTop: "100%",
                    overflow: "hidden",
                    backgroundColor: "#f8f8f8",
                  }}
                >
                  {product.badge && (
                    <div
                      style={{
                        position: "absolute",
                        top: "6px",
                        left: "6px",
                        backgroundColor: product.badgeColor || "#e74c3c",
                        color: "#fff",
                        fontSize: "8px",
                        fontWeight: "600",
                        padding: "2px 4px",
                        borderRadius: "2px",
                        zIndex: 3,
                        textTransform: "uppercase",
                        lineHeight: "1",
                      }}
                    >
                      {product.badge}
                    </div>
                  )}
                  <img
                    src={
                      product.images?.$values?.[0]?.imageUrl
                        ? `${baseURL}${product.images.$values[0].imageUrl}`
                        : "https://via.placeholder.com/100"
                    }
                    alt={product.title || "Product"}
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                  {product.discount && (
                    <div
                      style={{
                        position: "absolute",
                        top: "6px",
                        right: "6px",
                        backgroundColor: "#f57224",
                        color: "#fff",
                        fontSize: "10px",
                        fontWeight: "600",
                        padding: "2px 4px",
                        borderRadius: "2px",
                        lineHeight: "1",
                      }}
                    >
                      {product.discount}
                    </div>
                  )}
                </div>

                <div style={{ padding: "8px" }}>
                  <div
                    style={{
                      fontSize: "12px",
                      color: "#212121",
                      lineHeight: "1.3",
                      height: "30px",
                      overflow: "hidden",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      marginBottom: "6px",
                      fontWeight: "400",
                    }}
                  >
                    {product.title}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "baseline",
                      gap: "6px",
                      marginBottom: "2px",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "14px",
                        fontWeight: "600",
                        color: "#f57224",
                      }}
                    >
                      Rs. {product.currentPrice}
                    </span>
                    {product.originalPrice && (
                      <span
                        style={{
                          fontSize: "11px",
                          color: "#9e9e9e",
                          textDecoration: "line-through",
                        }}
                      >
                        Rs. {product.originalPrice}
                      </span>
                    )}
                  </div>
                  {renderStars(product.rating, product.reviews)}
                </div>
              </div>
            ))}
          </div>

          {/* Load More */}
          <div
            style={{
              backgroundColor: "#fff",
              padding: "20px",
              textAlign: "center",
              borderTop: "1px solid #f0f0f0",
            }}
          >
            {hasMoreProducts ? (
              <button
                onClick={handleLoadMore}
                style={{
                  backgroundColor: "transparent",
                  color: "#1976d2",
                  border: "2px solid #1976d2",
                  padding: "12px 80px",
                  fontSize: "14px",
                  fontWeight: "600",
                  borderRadius: "4px",
                  cursor: "pointer",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                }}
              >
                Load More
              </button>
            ) : allProductsLoaded ? (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  color: "#757575",
                  fontSize: "16px",
                }}
              >
                <Search size={20} />
                <span>Search for more products</span>
              </div>
            ) : null}
          </div>
        </>
      )}
    </div>
  );
};

export default ProductGrid;
