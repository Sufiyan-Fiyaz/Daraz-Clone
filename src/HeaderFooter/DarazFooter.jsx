import React, { useState } from "react";
import PaymentMethods from "../Checkouts/PaymentMethods";

const DarazFooter = () => {
  const [isActive, setIsActive] = useState(false);
  return (
    <div
      style={{
        backgroundColor: "#fff",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* Footer Content */}
      <div
        style={{
          backgroundColor: "#f8f8f8",
          padding: "40px 20px",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr 1fr 2fr",
            gap: "40px",
            alignItems: "start",
          }}
        >
          {/* Customer Care Section */}
          <div>
            <h3
              style={{
                fontSize: "16px",
                fontWeight: "600",
                color: "#0f136d",
                marginBottom: "20px",
                margin: "0 0 20px 0",
              }}
            >
              Customer Care
            </h3>
            <ul
              style={{
                listStyle: "none",
                padding: "0",
                margin: "0",
              }}
            >
              {[
                "Help Center",
                "How to Buy",
                "Corporate & Bulk Purchasing",
                "Returns & Refunds",
                "Daraz Shop",
                "Contact Us",
                "Purchase Protection",
                "Daraz Pick up Points",
              ].map((item, index) => (
                <li key={index} style={{ marginBottom: "8px" }}>
                  <a
                    href="#"
                    style={{
                      color: "#0f136d",
                      textDecoration: "none",
                      fontSize: "13px",
                      transition: "color 0.2s ease",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.textDecoration = "underline")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.textDecoration = "none")
                    }
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Daraz Section */}
          <div>
            <h3
              style={{
                fontSize: "16px",
                fontWeight: "600",
                color: "#0f136d",
                marginBottom: "20px",
                margin: "0 0 20px 0",
              }}
            >
              Daraz
            </h3>
            <ul
              style={{
                listStyle: "none",
                padding: "0",
                margin: "0",
              }}
            >
              {[
                "About Us",
                "Digital Payments",
                "Daraz Donates",
                "Daraz Blog",
                "Terms & Conditions",
                "Privacy Policy",
                "NTN Number : 4012118-6",
                "STRN Number : 1700401211818",
                "Online Shopping App",
                "Online Grocery Shopping",
                "Daraz Exclusive",
                "Daraz University",
                "Sell on Daraz",
                "Join Daraz Affiliate Program",
              ].map((item, index) => (
                <li key={index} style={{ marginBottom: "8px" }}>
                  <a
                    href="#"
                    style={{
                      color: "#0f136d",
                      textDecoration: "none",
                      fontSize: "13px",
                      transition: "color 0.2s ease",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.textDecoration = "underline")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.textDecoration = "none")
                    }
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Side - App Download and Payment/Verification */}
          {/* Happy Shopping Download App Section */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "20px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              {/* Daraz Logo */}
              <img
                src="https://img.lazcdn.com/us/domino/e07f9602-da7e-4d31-9c4f-df69a2e95325_PK-60-60.png"
                alt="Daraz Logo"
                style={{ width: "40px", height: "40px" }}
              />

              {/* Text Section */}
              <div style={{ display: "flex", flexDirection: "column" }}>
                <span
                  style={{
                    fontSize: "18px",
                    fontWeight: "600",
                    color: "#f57224",
                    lineHeight: "1.2",
                  }}
                >
                  Happy Shopping
                </span>
                <span
                  style={{
                    fontSize: "14px",
                    color: "#666",
                    marginTop: "4px",
                  }}
                >
                  Download this app
                </span>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "8px",
              }}
            >
              {/* First row: App Store + Google Play */}
              <div style={{ display: "flex", gap: "10px" }}>
                {/* App Store Button */}
                <a
                  href="https://itunes.apple.com/app/id978058048?mt=8"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: "block", width: "120px" }}
                >
                  <img
                    src="https://img.lazcdn.com/us/domino/2db6633b-c83c-48b7-9f7d-1262ee87cc80_PK-126-42.png"
                    alt="Apple App Download"
                    style={{ width: "100%", height: "100%" }}
                  />
                </a>

                {/* Google Play Button */}
                <a
                  href="https://play.google.com/store/apps/details?id=com.daraz.android"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: "block", width: "120px" }}
                >
                  <img
                    src="https://img.lazcdn.com/us/domino/4812f06f-072d-45be-a930-640edf4caeee_PK-126-42.png"
                    alt="Google Play Download"
                    style={{ width: "100%", height: "100%" }}
                  />
                </a>
              </div>

              {/* Second row: Huawei AppGallery */}
              <div>
                <a
                  href="https://appgallery.huawei.com/#/app/C101184687"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: "block", width: "120px" }}
                >
                  <img
                    src="	https://img.lazcdn.com/us/domino/7d216fe8-1bac-4ac9-81d3-072a9fbf32fc_PK-126-42.png"
                    alt="Huawei App Gallery"
                    style={{ width: "100%", height: "100%" }}
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Messages Button */}
      {/* <div
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          backgroundColor: isActive ? "#003e52" : "#fff",
          color: isActive ? "#fff" : "#044254",
          padding: "10px 18px",
          borderRadius: "25px",
          fontSize: "14px",
          fontWeight: "600",
          cursor: "pointer",
          boxShadow: "0 3px 10px rgba(0,0,0,0.25)",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          transition: "all 0.2s ease-in-out",
        }}
        onClick={() => setIsActive(!isActive)} // 👈 click pe toggle hoga
        onMouseEnter={(e) => {
          if (!isActive) {
            e.currentTarget.style.backgroundColor = "#f0f0f0";
          }
        }}
        onMouseLeave={(e) => {
          if (!isActive) {
            e.currentTarget.style.backgroundColor = "#fff";
          }
        }}
      >
        {/* SVG Icon */}
      {/* <svg
          width="18"
          height="18"
          viewBox="0 0 19 19"
          xmlns="http://www.w3.org/2000/svg"
          style={{ fill: isActive ? "#fff" : "#044254" }} // icon ka rang text ke sath match karega
        >
          <path d="M19.043 3.805c.134 0 .256.025.368.077.11.053.21.123.3.212.089.074.159.17.211.289A.946.946 0 0120 4.76V19l-3.805-3.805H5.761a.93.93 0 01-.378-.077.77.77 0 01-.289-.212.77.77 0 01-.212-.289.93.93 0 01-.077-.378v-1.891h12.347V3.805h1.891zM15.24 9.5a.89.89 0 01-.267.667c-.09.09-.193.16-.311.212a.893.893 0 01-.356.078h-9.5L1 14.239V.957c0-.134.027-.256.078-.368.052-.11.122-.21.212-.3.089-.089.188-.159.3-.211A.866.866 0 011.956 0h12.348c.118 0 .237.027.356.078.118.052.222.122.31.212a.89.89 0 01.268.667V9.5z" />
        </svg>
        Messages
      </div> */}

      <div>
        <PaymentMethods />
      </div>
    </div>
  );
};

export default DarazFooter;
