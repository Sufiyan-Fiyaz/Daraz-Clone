import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

const ProductForm = () => {
  const [formData, setFormData] = useState({
    Id: 0,
    Title: "",
    Description: "",
    CurrentPrice: "",
    OriginalPrice: "",
    Discount: "",
    Rating: "",
    Reviews: "",
    Badge: "",
    Brand: "",
    Installment: "",
    ColorFamily: "",
    StorageCapacity: "",
    Colors: [{ Id: 0, ColorName: "", ColorCode: "" }],
    StorageOptions: [{ Id: 0, StorageOption: "" }],
    DeliveryOptions: [
      {
        Id: 0,
        Location: "",
        StandardDeliveryText: "",
        StandardDeliveryTime: "",
        StandardDeliveryPrice: "",
        CashOnDelivery: true,
      },
    ],
    Warranty: {
      Id: 0,
      EasyReturn: "",
      BrandWarranty: "",
    },
    Seller: {
      Id: 0,
      SellerName: "",
      SellerType: "",
      ChatAvailable: true,
    },
  });

  // Separate state for images
  const [selectedImages, setSelectedImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);

  // CRUD states
  const [products, setProducts] = useState([]);
  const [editingProductId, setEditingProductId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentView, setCurrentView] = useState("create"); // 'create' or 'list'

  // Fetch all products (GET)
  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("https://localhost:7292/api/Product");
      if (response.ok) {
        const data = await response.json();
        console.log("API response:", data);

        // 👇 set only the array part
        setProducts(Array.isArray(data) ? data : data?.$values || []);
      } else {
        toast.error("Failed to fetch products");
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Error fetching products: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Load products on component mount
  useEffect(() => {
    fetchProducts();
  }, []);

  // Reset form to initial state
  const resetForm = () => {
    setFormData({
      Id: 0,
      Title: "",
      Description: "",
      CurrentPrice: "",
      OriginalPrice: "",
      Discount: "",
      Rating: "",
      Reviews: "",
      Badge: "",
      Brand: "",
      Installment: "",
      ColorFamily: "",
      StorageCapacity: "",
      Colors: [{ Id: 0, ColorName: "", ColorCode: "" }],
      StorageOptions: [{ Id: 0, StorageOption: "" }],
      DeliveryOptions: [
        {
          Id: 0,
          Location: "",
          StandardDeliveryText: "",
          StandardDeliveryTime: "",
          StandardDeliveryPrice: "",
          CashOnDelivery: true,
        },
      ],
      Warranty: {
        Id: 0,
        EasyReturn: "",
        BrandWarranty: "",
      },
      Seller: {
        Id: 0,
        SellerName: "",
        SellerType: "",
        ChatAvailable: true,
      },
    });
    setSelectedImages([]);
    setImagePreviews([]);
    setEditingProductId(null);
  };

  // Load product data for editing
  // Load product data for editing
  const loadProductForEdit = (product) => {
    const normalizedProduct = {
      Id: product.id || 0,
      Title: product.title || "",
      Description: product.description || "",
      CurrentPrice: product.currentPrice || "",
      OriginalPrice: product.originalPrice || "",
      Discount: product.discount || "",
      Rating: product.rating || "",
      Reviews: product.reviews || "",
      Badge: product.badge || "",
      Brand: product.brand || "",
      Installment: product.installment || "",
      ColorFamily: product.colorFamily || "",
      StorageCapacity: product.storageCapacity || "",
      Colors: Array.isArray(product.colors)
        ? product.colors
        : [{ Id: 0, ColorName: "", ColorCode: "" }],
      StorageOptions: Array.isArray(product.storageOptions)
        ? product.storageOptions
        : [{ Id: 0, StorageOption: "" }],
      DeliveryOptions: Array.isArray(product.deliveryOptions)
        ? product.deliveryOptions
        : [
            {
              Id: 0,
              Location: "",
              StandardDeliveryText: "",
              StandardDeliveryTime: "",
              StandardDeliveryPrice: "",
              CashOnDelivery: true,
            },
          ],
      Warranty: product.warranty || {
        Id: 0,
        EasyReturn: "",
        BrandWarranty: "",
      },
      Seller: product.seller || {
        Id: 0,
        SellerName: "",
        SellerType: "",
        ChatAvailable: true,
      },
    };

    setFormData(normalizedProduct);
    setEditingProductId(normalizedProduct.Id);
    setCurrentView("create");
    setSelectedImages([]);
    setImagePreviews([]);
  };

  // Delete product
  const deleteProduct = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) {
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`https://localhost:7292/api/Product/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        toast.success("Product deleted successfully!");
        await fetchProducts(); // Refresh the list
      } else {
        toast.error("Failed to delete product");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("Error deleting product: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle primitive/nested fields
  const handleChange = (e, path) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => {
      const updated = { ...prev };
      let obj = updated;
      if (path) path.split(".").forEach((key) => (obj = obj[key]));
      obj[name] = type === "checkbox" ? checked : value;
      return updated;
    });
  };

  // Handle array fields
  const handleArrayChange = (e, index, key) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => {
      const updated = { ...prev };
      updated[key][index][name] = type === "checkbox" ? checked : value;
      return updated;
    });
  };

  // Handle multiple image selection
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedImages(files);

    // Create previews
    const previews = [];
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        previews.push(reader.result);
        if (previews.length === files.length) {
          setImagePreviews([...previews]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  // Add new array items
  const addArrayItem = (key, template) => {
    setFormData((prev) => ({
      ...prev,
      [key]: [...prev[key], template],
    }));
  };

  // Remove array items
  const removeArrayItem = (key, index) => {
    setFormData((prev) => ({
      ...prev,
      [key]: prev[key].filter((_, i) => i !== index),
    }));
  };

  // Submit product (CREATE or UPDATE)
  const handleProductSubmit = async (e) => {
    e.preventDefault();

    // For new products, validate that at least one image is selected
    if (!editingProductId && selectedImages.length === 0) {
      toast("Please select at least one image");
      return;
    }

    const formDataObj = new FormData();
    const isUpdate = editingProductId !== null;

    // Append basic fields
    formDataObj.append("Id", editingProductId || 0);
    formDataObj.append("Title", formData.Title);
    formDataObj.append("Description", formData.Description);
    formDataObj.append("CurrentPrice", formData.CurrentPrice);
    formDataObj.append("OriginalPrice", formData.OriginalPrice);
    formDataObj.append("Discount", formData.Discount);
    formDataObj.append("Rating", formData.Rating);
    formDataObj.append("Reviews", formData.Reviews);
    formDataObj.append("Badge", formData.Badge);
    formDataObj.append("Brand", formData.Brand);
    formDataObj.append("Installment", formData.Installment);
    formDataObj.append("ColorFamily", formData.ColorFamily);
    formDataObj.append("StorageCapacity", formData.StorageCapacity);

    // Images - only append if new images are selected
    if (selectedImages.length > 0) {
      selectedImages.forEach((file, i) => {
        formDataObj.append(`Images[${i}].Id`, 0);
        formDataObj.append(`Images[${i}].File`, file);
      });
    }

    // Colors
    formData.Colors.forEach((c, i) => {
      formDataObj.append(`Colors[${i}].Id`, c.Id);
      formDataObj.append(`Colors[${i}].ColorName`, c.ColorName);
      formDataObj.append(`Colors[${i}].ColorCode`, c.ColorCode);
    });

    // StorageOptions
    formData.StorageOptions.forEach((s, i) => {
      formDataObj.append(`StorageOptions[${i}].Id`, s.Id);
      formDataObj.append(`StorageOptions[${i}].StorageOption`, s.StorageOption);
    });

    // DeliveryOptions
    formData.DeliveryOptions.forEach((d, i) => {
      formDataObj.append(`DeliveryOptions[${i}].Id`, d.Id);
      formDataObj.append(`DeliveryOptions[${i}].Location`, d.Location);
      formDataObj.append(
        `DeliveryOptions[${i}].StandardDeliveryText`,
        d.StandardDeliveryText
      );
      formDataObj.append(
        `DeliveryOptions[${i}].StandardDeliveryTime`,
        d.StandardDeliveryTime
      );
      formDataObj.append(
        `DeliveryOptions[${i}].StandardDeliveryPrice`,
        d.StandardDeliveryPrice
      );
      formDataObj.append(
        `DeliveryOptions[${i}].CashOnDelivery`,
        d.CashOnDelivery
      );
    });

    // Warranty
    formDataObj.append("Warranty.Id", formData.Warranty.Id);
    formDataObj.append("Warranty.EasyReturn", formData.Warranty.EasyReturn);
    formDataObj.append(
      "Warranty.BrandWarranty",
      formData.Warranty.BrandWarranty
    );

    // Seller
    formDataObj.append("Seller.Id", formData.Seller.Id);
    formDataObj.append("Seller.SellerName", formData.Seller.SellerName);
    formDataObj.append("Seller.SellerType", formData.Seller.SellerType);
    formDataObj.append("Seller.ChatAvailable", formData.Seller.ChatAvailable);

    try {
      const url = isUpdate
        ? `https://localhost:7292/api/Product/${editingProductId}`
        : "https://localhost:7292/api/Product";

      const method = isUpdate ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        body: formDataObj,
      });

      if (res.ok) {
        toast(`Product ${isUpdate ? "updated" : "created"} successfully!`);
        resetForm();
        await fetchProducts(); // Refresh the list
        setCurrentView("list"); // Switch to list view
      } else {
        const errorText = await res.text();
        console.error("Server error:", errorText);
        toast.error(
          `Failed to ${isUpdate ? "update" : "create"} product: ` + errorText
        );
      }
    } catch (err) {
      console.error("Network error:", err);
      toast.error(
        `Error ${isUpdate ? "updating" : "creating"} product: ` + err.message
      );
    }
  };

  const darazOrange = "#F57224";
  const darazGray = "#F5F5F5";
  const darazDark = "#222";
  const darazBorder = "#EAEAEA";
  const darazLightGray = "#FAFAFA";

  const containerStyle = {
    padding: "100px 0",
    maxWidth: "1100px",
    margin: "0 auto",
    fontFamily: "Segoe UI, Arial, sans-serif",
    background: darazGray,
    minHeight: "100vh",
  };

  const headerStyle = {
    backgroundColor: "#fff",
    padding: "28px 0 18px 0",
    borderRadius: "8px",
    marginBottom: "28px",
    textAlign: "center",
    boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
    border: `1px solid ${darazBorder}`,
  };

  const navButtonStyle = {
    padding: "10px 32px",
    margin: "0 8px",
    border: "none",
    borderRadius: "4px 4px 0 0",
    cursor: "pointer",
    fontSize: "15px",
    fontWeight: 500,
    background: "none",
    color: darazDark,
    borderBottom: `2px solid transparent`,
    transition: "all 0.2s",
  };

  const activeButtonStyle = {
    ...navButtonStyle,
    color: darazOrange,
    borderBottom: `2px solid ${darazOrange}`,
    background: darazLightGray,
  };

  const inactiveButtonStyle = {
    ...navButtonStyle,
    color: "#888",
    background: "#fff",
  };

  const cardStyle = {
    border: `1px solid ${darazBorder}`,
    borderRadius: "8px",
    padding: "28px 32px",
    marginBottom: "28px",
    backgroundColor: "#fff",
    boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
  };

  const sectionTitleStyle = {
    margin: "0 0 18px 0",
    color: darazDark,
    fontWeight: 600,
    fontSize: "20px",
    letterSpacing: "0.5px",
    borderBottom: `1px solid ${darazBorder}`,
    paddingBottom: "8px",
  };

  const labelStyle = {
    display: "block",
    marginBottom: "6px",
    color: "#444",
    fontWeight: 500,
    fontSize: "15px",
    letterSpacing: "0.2px",
  };

  const inputStyle = {
    border: `1px solid ${darazBorder}`,
    padding: "10px 14px",
    width: "100%",
    borderRadius: "4px",
    fontSize: "15px",
    marginBottom: "18px",
    background: darazGray,
    color: darazDark,
    outline: "none",
    fontWeight: 400,
  };

  const textareaStyle = {
    ...inputStyle,
    minHeight: "80px",
    resize: "vertical",
  };

  const buttonStyle = {
    padding: "10px 24px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "15px",
    margin: "5px",
    fontWeight: 500,
    letterSpacing: "0.2px",
    boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
  };

  const primaryButtonStyle = {
    ...buttonStyle,
    backgroundColor: darazOrange,
    color: "#fff",
    border: `1px solid ${darazOrange}`,
  };

  const secondaryButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#fff",
    color: darazOrange,
    border: `1px solid ${darazOrange}`,
  };

  const successButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#43B02A",
    color: "#fff",
    border: "1px solid #43B02A",
  };

  const dangerButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#F44336",
    color: "#fff",
    border: "1px solid #F44336",
  };

  const flexStyle = {
    display: "flex",
    gap: "18px",
    alignItems: "center",
    marginBottom: "18px",
  };

  const tableHeaderStyle = {
    backgroundColor: darazGray,
    color: darazDark,
    fontWeight: 600,
    fontSize: "15px",
    letterSpacing: "0.2px",
  };

  const tableCellStyle = {
    padding: "14px 10px",
    borderBottom: `1px solid ${darazBorder}`,
    fontSize: "15px",
    color: "#444",
    background: "#fff",
  };

  const tableRowStyle = {
    borderBottom: `1px solid ${darazBorder}`,
    background: "#fff",
  };

  const imagePreviewStyle = {
    width: "90px",
    height: "90px",
    objectFit: "cover",
    borderRadius: "4px",
    border: `1px solid ${darazBorder}`,
    background: darazGray,
  };

  const subSectionCardStyle = {
    border: `1px solid ${darazBorder}`,
    borderRadius: "6px",
    padding: "18px 20px",
    marginBottom: "18px",
    backgroundColor: darazLightGray,
  };

  return (
    <div style={containerStyle}>
      {/* Header Navigation */}
      <div style={headerStyle}>
        <h1
          style={{
            margin: "0 0 18px 0",
            color: darazOrange,
            fontWeight: 700,
            fontSize: "28px",
            letterSpacing: "1px",
          }}
        >
          Seller Dashboard
        </h1>
        <div style={{ display: "flex", justifyContent: "center", gap: "0" }}>
          <button
            style={
              currentView === "create" ? activeButtonStyle : inactiveButtonStyle
            }
            onClick={() => {
              setCurrentView("create");
              if (editingProductId) resetForm();
            }}
          >
            {editingProductId ? "Edit Product" : "Create Product"}
          </button>
          <button
            style={
              currentView === "list" ? activeButtonStyle : inactiveButtonStyle
            }
            onClick={() => setCurrentView("list")}
          >
            View Products ({products.length})
          </button>
        </div>
      </div>

      {isLoading && (
        <div
          style={{
            textAlign: "center",
            padding: "24px",
            color: "#888",
            fontSize: "17px",
          }}
        >
          Loading...
        </div>
      )}

      {/* Create/Edit Form View */}
      {currentView === "create" && (
        <div style={cardStyle}>
          <h2 style={sectionTitleStyle}>
            {editingProductId
              ? `Edit Product (ID: ${editingProductId})`
              : "Create New Product"}
          </h2>

          {editingProductId && (
            <div style={{ marginBottom: "18px" }}>
              <button style={secondaryButtonStyle} onClick={resetForm}>
                Cancel Edit
              </button>
            </div>
          )}

          <form onSubmit={handleProductSubmit}>
            {/* Basic Info Section */}
            <div style={subSectionCardStyle}>
              <h3 style={sectionTitleStyle}>Basic Information</h3>
              <label style={labelStyle}>Product Title *</label>
              <input
                type="text"
                name="Title"
                placeholder="Product Title"
                value={formData.Title}
                onChange={handleChange}
                style={inputStyle}
                required
              />

              <label style={labelStyle}>Product Description *</label>
              <textarea
                name="Description"
                placeholder="Product Description"
                value={formData.Description}
                onChange={handleChange}
                style={textareaStyle}
                required
              />

              <div style={flexStyle}>
                <div style={{ flex: 1 }}>
                  <label style={labelStyle}>Current Price *</label>
                  <input
                    type="number"
                    name="CurrentPrice"
                    placeholder="Current Price"
                    value={formData.CurrentPrice}
                    onChange={handleChange}
                    style={inputStyle}
                    required
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={labelStyle}>Original Price</label>
                  <input
                    type="number"
                    name="OriginalPrice"
                    placeholder="Original Price"
                    value={formData.OriginalPrice}
                    onChange={handleChange}
                    style={inputStyle}
                  />
                </div>
              </div>

              <div style={flexStyle}>
                <div style={{ flex: 1 }}>
                  <label style={labelStyle}>Discount</label>
                  <input
                    type="text"
                    name="Discount"
                    placeholder="Discount"
                    value={formData.Discount}
                    onChange={handleChange}
                    style={inputStyle}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={labelStyle}>Rating</label>
                  <input
                    type="number"
                    step="0.1"
                    name="Rating"
                    placeholder="Rating"
                    value={formData.Rating}
                    onChange={handleChange}
                    style={inputStyle}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={labelStyle}>Reviews Count</label>
                  <input
                    type="number"
                    name="Reviews"
                    placeholder="Reviews Count"
                    value={formData.Reviews}
                    onChange={handleChange}
                    style={inputStyle}
                  />
                </div>
              </div>

              <div style={flexStyle}>
                <div style={{ flex: 1 }}>
                  <label style={labelStyle}>Badge</label>
                  <input
                    type="text"
                    name="Badge"
                    placeholder="Badge"
                    value={formData.Badge}
                    onChange={handleChange}
                    style={inputStyle}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={labelStyle}>Brand</label>
                  <input
                    type="text"
                    name="Brand"
                    placeholder="Brand"
                    value={formData.Brand}
                    onChange={handleChange}
                    style={inputStyle}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={labelStyle}>Installment Info</label>
                  <input
                    type="text"
                    name="Installment"
                    placeholder="Installment Info"
                    value={formData.Installment}
                    onChange={handleChange}
                    style={inputStyle}
                  />
                </div>
              </div>

              <div style={flexStyle}>
                <div style={{ flex: 1 }}>
                  <label style={labelStyle}>Color Family</label>
                  <input
                    type="text"
                    name="ColorFamily"
                    placeholder="Color Family"
                    value={formData.ColorFamily}
                    onChange={handleChange}
                    style={inputStyle}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={labelStyle}>Storage Capacity</label>
                  <input
                    type="text"
                    name="StorageCapacity"
                    placeholder="Storage Capacity"
                    value={formData.StorageCapacity}
                    onChange={handleChange}
                    style={inputStyle}
                  />
                </div>
              </div>
            </div>

            {/* Images Section */}
            <div style={subSectionCardStyle}>
              <h3 style={sectionTitleStyle}>
                Product Images {!editingProductId && "*"}
              </h3>
              <label style={labelStyle}>Upload Images</label>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageChange}
                style={inputStyle}
                required={!editingProductId}
              />
              {imagePreviews.length > 0 && (
                <div
                  style={{
                    display: "flex",
                    gap: "12px",
                    flexWrap: "wrap",
                    marginTop: "10px",
                  }}
                >
                  {imagePreviews.map((preview, i) => (
                    <img
                      key={i}
                      src={preview}
                      alt={`Preview ${i + 1}`}
                      style={imagePreviewStyle}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Colors Section */}
            <div style={subSectionCardStyle}>
              <h3 style={sectionTitleStyle}>Colors</h3>
              {formData.Colors.map((c, i) => (
                <div key={i} style={{ ...flexStyle, marginBottom: "10px" }}>
                  <div style={{ flex: 1 }}>
                    <label style={labelStyle}>Color Name</label>
                    <input
                      type="text"
                      name="ColorName"
                      placeholder="Color Name"
                      value={c.ColorName}
                      onChange={(e) => handleArrayChange(e, i, "Colors")}
                      style={inputStyle}
                    />
                  </div>
                  <div style={{ flex: 1 }}>
                    <label style={labelStyle}>Color Code (#hex)</label>
                    <input
                      type="text"
                      name="ColorCode"
                      placeholder="Color Code (#hex)"
                      value={c.ColorCode}
                      onChange={(e) => handleArrayChange(e, i, "Colors")}
                      style={inputStyle}
                    />
                  </div>
                  {formData.Colors.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeArrayItem("Colors", i)}
                      style={dangerButtonStyle}
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={() =>
                  addArrayItem("Colors", {
                    Id: 0,
                    ColorName: "",
                    ColorCode: "",
                  })
                }
                style={secondaryButtonStyle}
              >
                + Add Color
              </button>
            </div>

            {/* Storage Options Section */}
            <div style={subSectionCardStyle}>
              <h3 style={sectionTitleStyle}>Storage Options</h3>
              {formData.StorageOptions.map((s, i) => (
                <div key={i} style={{ ...flexStyle, marginBottom: "10px" }}>
                  <div style={{ flex: 1 }}>
                    <label style={labelStyle}>Storage Option</label>
                    <input
                      type="text"
                      name="StorageOption"
                      placeholder="Storage Option (e.g., 128GB, 256GB)"
                      value={s.StorageOption}
                      onChange={(e) =>
                        handleArrayChange(e, i, "StorageOptions")
                      }
                      style={inputStyle}
                    />
                  </div>
                  {formData.StorageOptions.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeArrayItem("StorageOptions", i)}
                      style={dangerButtonStyle}
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={() =>
                  addArrayItem("StorageOptions", { Id: 0, StorageOption: "" })
                }
                style={secondaryButtonStyle}
              >
                + Add Storage Option
              </button>
            </div>

            {/* Delivery Options Section */}
            <div style={subSectionCardStyle}>
              <h3 style={sectionTitleStyle}>Delivery Options</h3>
              {formData.DeliveryOptions.map((d, i) => (
                <div
                  key={i}
                  style={{
                    border: `1px solid ${darazBorder}`,
                    padding: "14px 16px",
                    borderRadius: "4px",
                    marginBottom: "14px",
                    background: "#fff",
                  }}
                >
                  <h4
                    style={{
                      marginTop: 0,
                      color: darazOrange,
                      fontWeight: 600,
                      fontSize: "16px",
                    }}
                  >
                    Delivery Option {i + 1}
                  </h4>
                  <label style={labelStyle}>Location</label>
                  <input
                    type="text"
                    name="Location"
                    placeholder="Location"
                    value={d.Location}
                    onChange={(e) => handleArrayChange(e, i, "DeliveryOptions")}
                    style={inputStyle}
                  />
                  <label style={labelStyle}>Delivery Text</label>
                  <input
                    type="text"
                    name="StandardDeliveryText"
                    placeholder="Delivery Text"
                    value={d.StandardDeliveryText}
                    onChange={(e) => handleArrayChange(e, i, "DeliveryOptions")}
                    style={inputStyle}
                  />
                  <div style={flexStyle}>
                    <div style={{ flex: 1 }}>
                      <label style={labelStyle}>Delivery Time</label>
                      <input
                        type="text"
                        name="StandardDeliveryTime"
                        placeholder="Delivery Time"
                        value={d.StandardDeliveryTime}
                        onChange={(e) =>
                          handleArrayChange(e, i, "DeliveryOptions")
                        }
                        style={inputStyle}
                      />
                    </div>
                    <div style={{ flex: 1 }}>
                      <label style={labelStyle}>Delivery Price</label>
                      <input
                        type="text"
                        name="StandardDeliveryPrice"
                        placeholder="Delivery Price"
                        value={d.StandardDeliveryPrice}
                        onChange={(e) =>
                          handleArrayChange(e, i, "DeliveryOptions")
                        }
                        style={inputStyle}
                      />
                    </div>
                  </div>
                  <label
                    style={{
                      display: "flex",
                      alignItems: "center",
                      margin: "10px 0",
                      fontWeight: 500,
                      color: "#444",
                    }}
                  >
                    <input
                      type="checkbox"
                      name="CashOnDelivery"
                      checked={d.CashOnDelivery}
                      onChange={(e) =>
                        handleArrayChange(e, i, "DeliveryOptions")
                      }
                      style={{ marginRight: "8px" }}
                    />
                    Cash On Delivery Available
                  </label>
                </div>
              ))}
            </div>

            {/* Warranty Section */}
            <div style={subSectionCardStyle}>
              <h3 style={sectionTitleStyle}>Warranty Information</h3>
              <label style={labelStyle}>Easy Return Policy</label>
              <input
                type="text"
                name="EasyReturn"
                placeholder="Easy Return Policy"
                value={formData.Warranty.EasyReturn}
                onChange={(e) => handleChange(e, "Warranty")}
                style={inputStyle}
              />
              <label style={labelStyle}>Brand Warranty</label>
              <input
                type="text"
                name="BrandWarranty"
                placeholder="Brand Warranty"
                value={formData.Warranty.BrandWarranty}
                onChange={(e) => handleChange(e, "Warranty")}
                style={inputStyle}
              />
            </div>

            {/* Seller Section */}
            <div style={subSectionCardStyle}>
              <h3 style={sectionTitleStyle}>Seller Information</h3>
              <div style={flexStyle}>
                <div style={{ flex: 1 }}>
                  <label style={labelStyle}>Seller Name</label>
                  <input
                    type="text"
                    name="SellerName"
                    placeholder="Seller Name"
                    value={formData.Seller.SellerName}
                    onChange={(e) => handleChange(e, "Seller")}
                    style={inputStyle}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={labelStyle}>Seller Type</label>
                  <input
                    type="text"
                    name="SellerType"
                    placeholder="Seller Type"
                    value={formData.Seller.SellerType}
                    onChange={(e) => handleChange(e, "Seller")}
                    style={inputStyle}
                  />
                </div>
              </div>
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  margin: "10px 0",
                  fontWeight: 500,
                  color: "#444",
                }}
              >
                <input
                  type="checkbox"
                  name="ChatAvailable"
                  checked={formData.Seller.ChatAvailable}
                  onChange={(e) => handleChange(e, "Seller")}
                  style={{ marginRight: "8px" }}
                />
                Chat Available
              </label>
            </div>

            {/* Submit Button */}
            <div style={{ textAlign: "center", marginTop: "32px" }}>
              <button
                type="submit"
                style={{
                  ...primaryButtonStyle,
                  padding: "14px 38px",
                  fontSize: "17px",
                  fontWeight: 600,
                }}
              >
                {editingProductId ? "Update Product" : "Create Product"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Products List View */}
      {currentView === "list" && (
        <div style={cardStyle}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "18px",
            }}
          >
            <h2 style={sectionTitleStyle}>Products List</h2>
            <button
              style={successButtonStyle}
              onClick={() => {
                resetForm();
                setCurrentView("create");
              }}
            >
              + Create New Product
            </button>
          </div>

          {products.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                padding: "40px",
                color: "#888",
                fontSize: "16px",
              }}
            >
              <p>No products found. Create your first product!</p>
            </div>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  background: "#fff",
                }}
              >
                <thead>
                  <tr style={tableHeaderStyle}>
                    <th style={tableCellStyle}>ID</th>
                    <th style={tableCellStyle}>Title</th>
                    <th style={tableCellStyle}>Brand</th>
                    <th style={tableCellStyle}>Price</th>
                    <th style={tableCellStyle}>Rating</th>
                    <th style={{ ...tableCellStyle, textAlign: "center" }}>
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.id} style={tableRowStyle}>
                      <td style={tableCellStyle}>{product.id}</td>
                      <td
                        style={{
                          ...tableCellStyle,
                          fontWeight: "bold",
                          color: darazOrange,
                        }}
                      >
                        {product.title}
                      </td>
                      <td style={tableCellStyle}>{product.brand}</td>
                      <td
                        style={{
                          ...tableCellStyle,
                          color: "#43B02A",
                          fontWeight: 600,
                        }}
                      >
                        ${product.currentPrice}
                      </td>
                      <td style={tableCellStyle}>
                        {product.rating ? `⭐ ${product.rating}` : "No rating"}
                      </td>
                      <td style={{ ...tableCellStyle, textAlign: "center" }}>
                        <button
                          style={primaryButtonStyle}
                          onClick={() => loadProductForEdit(product)}
                        >
                          Edit
                        </button>
                        <button
                          style={dangerButtonStyle}
                          onClick={() => deleteProduct(product.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div style={{ marginTop: "22px", textAlign: "center" }}>
            <button style={secondaryButtonStyle} onClick={fetchProducts}>
              🔄 Refresh List
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductForm;
