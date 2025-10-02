import React, { useState, useEffect } from "react";
import Slide1 from "../assets/SliderImages/Slide1.jpg";
import Slide2 from "../assets/SliderImages/Slide2.jpg";
import Slide3 from "../assets/SliderImages/Slide3.jpg";
import Slide4 from "../assets/SliderImages/Slide4.jpg";
import Slide5 from "../assets/SliderImages/Slide5.jpg";
import Slide6 from "../assets/SliderImages/Slide6.jpg";
import SaleBanner from "../assets/SliderImages/Slide7.gif";
import FlashSale from "./FlashSale";
import Categories from "./Categories";
import ProductGrid from "./JustForYou";
import DarazFooter from "../HeaderFooter/DarazFooter";

const Home = () => {
  const images = [Slide1, Slide2, Slide3, Slide4, Slide5, Slide6];
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "1200px",
        margin: "20px auto",
      }}
    >
      {/* 🔹 Image Slider */}
      <div
        style={{
          position: "relative",
          overflow: "hidden",
          borderRadius: "10px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          minHeight: "400px",
        }}
      >
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`slide-${index}`}
            style={{
              width: "100%",
              height: "400px",
              objectFit: "cover",
              position: "absolute",
              top: 0,
              left: `${(index - current) * 100}%`,
              transition: "left 0.8s ease-in-out",
            }}
          />
        ))}

        {/* Arrows */}
        <button
          onClick={() =>
            setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1))
          }
          style={{
            position: "absolute",
            top: "50%",
            left: "10px",
            transform: "translateY(-50%)",
            backgroundColor: "rgba(0,0,0,0.5)",
            color: "white",
            border: "none",
            padding: "10px",
            borderRadius: "50%",
            cursor: "pointer",
          }}
        >
          ❮
        </button>
        <button
          onClick={() => setCurrent((prev) => (prev + 1) % images.length)}
          style={{
            position: "absolute",
            top: "50%",
            right: "10px",
            transform: "translateY(-50%)",
            backgroundColor: "rgba(0,0,0,0.5)",
            color: "white",
            border: "none",
            padding: "10px",
            borderRadius: "50%",
            cursor: "pointer",
          }}
        >
          ❯
        </button>

        {/* Dots */}
        <div
          style={{
            position: "absolute",
            bottom: "15px",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            gap: "8px",
          }}
        >
          {images.map((_, index) => (
            <div
              key={index}
              onClick={() => setCurrent(index)}
              style={{
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                backgroundColor: current === index ? "#f85606" : "#ccc",
                cursor: "pointer",
              }}
            />
          ))}
        </div>
      </div>

      {/* 🔹 Sale Banner */}
      <div
        style={{
          marginTop: "20px",
          textAlign: "center",
        }}
      >
        <img
          src={SaleBanner}
          alt="9.9 Sale Banner"
          style={{
            width: "100%",
            borderRadius: "12px",
            cursor: "pointer",
          }}
        />
      </div>
      <div style={{ width: "100%", maxWidth: "1200px", margin: "20px auto" }}>
        {/* Slider + Sale Banner (tumhara existing code) */}

        {/* Flash Sale Section */}
        <FlashSale />
      </div>
      <div style={{ width: "100%", maxWidth: "1200px", margin: "20px auto" }}>
        <Categories />
      </div>
      <div>
        <ProductGrid />
      </div>
      <div style={{ width: "100%", maxWidth: "1200px", margin: "20px auto" }}>
        <DarazFooter />
      </div>
    </div>
  );
};

export default Home;
