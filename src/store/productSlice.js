import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedProduct: null,
  products: [
    // Your existing products array with additional data for product detail page
    {
      id: 1,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEFQY4T97Ho7jKoJdn1IYUiVYCNns2BRXTdw&s",
      title: "Samsung Galaxy A06 4GB RAM + 64 GB ROM",
      currentPrice: "Rs.20,999",
      originalPrice: "Rs.26,999",
      discount: "-22%",
      rating: 4.5,
      reviews: 440,
      badge: null,
      brand: "Samsung",
      description:
        "Samsung Galaxy A06 with 4GB RAM and 64GB storage, featuring a stunning display and powerful performance for everyday use.",
      installment: "Up to 36 months, as low as Rs. 997 per month",
      colorFamily: "Black",
      storageCapacity: "64GB",
      colors: [
        { name: "Black", code: "#000000" },
        { name: "Blue", code: "#1976d2" },
        { name: "Green", code: "#4caf50" },
        { name: "Gold", code: "#ffd700" },
      ],
      storageOptions: ["64GB", "128GB"],
      deliveryInfo: {
        location: "Sindh, Karachi - Gulshan-e-Iqbal, Block 15",
        standardDelivery: {
          text: "Standard Delivery",
          time: "Get by 13-17 Sep",
          price: "Rs. 125",
        },
        cashOnDelivery: true,
      },
      warranty: {
        easyReturn: "14 days easy return",
        brandWarranty: "1 Year Brand Warranty",
      },
      seller: {
        name: "Samsung",
        type: "Flagship Store",
        chatAvailable: true,
      },
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=200&h=200&fit=crop",
      title: "AirPods Pro 2nd Generation - Wireless...",
      currentPrice: "Rs.848",
      originalPrice: "Rs.1,200",
      discount: "-50%",
      rating: 4.3,
      reviews: 1395,
      badge: null,
      brand: "Apple",
      description:
        "AirPods Pro with Active Noise Cancellation and Spatial Audio for an immersive listening experience.",
      installment: "Up to 12 months, as low as Rs. 85 per month",
      colorFamily: "White",
      storageCapacity: "N/A",
      colors: [{ name: "White", code: "#ffffff" }],
      storageOptions: [],
      deliveryInfo: {
        location: "Sindh, Karachi - Gulshan-e-Iqbal, Block 15",
        standardDelivery: {
          text: "Standard Delivery",
          time: "Get by 13-17 Sep",
          price: "Rs. 125",
        },
        cashOnDelivery: true,
      },
      warranty: {
        easyReturn: "14 days easy return",
        brandWarranty: "1 Year Brand Warranty",
      },
      seller: {
        name: "Apple Store",
        type: "Official Store",
        chatAvailable: true,
      },
    },
    // Add similar detailed data for other products as needed
  ],
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setSelectedProduct: (state, action) => {
      state.selectedProduct = action.payload;
    },
    clearSelectedProduct: (state) => {
      state.selectedProduct = null;
    },
  },
});

export const { setSelectedProduct, clearSelectedProduct } =
  productSlice.actions;
export default productSlice.reducer;
