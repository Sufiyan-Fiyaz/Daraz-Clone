import React, { useState, createContext, useContext, useEffect } from "react";

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // ✅ Restore cart from localStorage on first load
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // ✅ Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      // Normalize images into array of objects
      let normalizedImages = [];

      if (Array.isArray(product.images)) {
        normalizedImages = product.images.map((img) =>
          typeof img === "string" ? { imageUrl: img } : img
        );
      } else if (product.images?.$values) {
        normalizedImages = product.images.$values.map((img) =>
          typeof img === "string" ? { imageUrl: img } : img
        );
      } else if (typeof product.images === "string") {
        normalizedImages = [{ imageUrl: product.images }];
      }

      return [
        ...prevCart,
        {
          id: product.id,
          title: product.title,
          currentPrice: product.currentPrice,
          originalPrice: product.originalPrice,
          images: normalizedImages, // ✅ store as array of objects
          seller: product.seller || null,
          quantity: 1,
        },
      ];
    });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
