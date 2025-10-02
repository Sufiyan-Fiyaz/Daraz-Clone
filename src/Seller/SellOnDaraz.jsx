import React from "react";
import { useNavigate } from "react-router-dom";
import Slide8 from "../assets/SliderImages/Slide8.webp";
import Slide9 from "../assets/SliderImages/Slide9.webp";
import Slide10 from "../assets/SliderImages/Slide10.webp";
import Slide11 from "../assets/SliderImages/Slide11.webp";
import Slide12 from "../assets/SliderImages/Slide12.webp";
import DarazFooter from "../HeaderFooter/DarazFooter";

const SellOnDaraz = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/sellerlogin"); // the route for your seller login page
  };
  return (
    <div className="sell-on-daraz-page">
      {/* Hero Section - Orange Banner */}
      <section className="hero-section">
        <img
          src={Slide8}
          alt="Open Your Daraz Online Store for Free"
          style={{
            width: "90%",
            height: "544px",
            display: "block",
            marginTop: "20px",
            marginLeft: "80px",
            cursor: "pointer", // shows pointer on hover
          }}
          onClick={handleClick}
        />
      </section>

      {/* How to Join Section - Purple Gradient Banner */}
      <section className="how-to-join-section">
        <img
          src={Slide9}
          alt="How to Join - 4 Steps Process"
          style={{
            width: "80%",
            marginTop: "20px",
            height: "496px",
            display: "block",
            marginBottom: "0",
            marginLeft: "150px",
          }}
        />
      </section>

      {/* Dedicated Support Section - Dark Purple Banner */}
      <section className="support-section">
        <img
          src={Slide10}
          alt="Dedicated Support For New Sellers"
          style={{
            width: "80%",
            marginTop: "20px",
            height: "auto",
            display: "block",
            marginBottom: "0",
            marginLeft: "150px",
          }}
        />
      </section>

      {/* Campaign Section - Purple Banner with Characters */}
      <section className="campaign-section">
        <img
          src={Slide11}
          alt="Join The BIGGEST Campaigns"
          style={{
            width: "80%",
            marginTop: "20px",
            height: "auto",
            display: "block",
            marginBottom: "0",
            marginLeft: "150px",
          }}
        />
      </section>
      <section className="campaign-section">
        <img
          src={Slide12}
          alt="Join The BIGGEST Campaigns"
          style={{
            width: "80%",
            marginTop: "20px",
            height: "auto",
            display: "block",
            marginBottom: "50px",
            marginLeft: "150px",
          }}
        />
      </section>
      <DarazFooter />
    </div>
  );
};

export default SellOnDaraz;
