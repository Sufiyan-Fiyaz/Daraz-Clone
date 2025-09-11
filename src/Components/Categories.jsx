import React from "react";

const categories = [
  {
    id: 1,
    name: "3D Printers",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCWv5afC9WXyLSVtp6u5LTjikJHKidrNvrPA&s",
  },
  {
    id: 2,
    name: "Pasta, Noodle & Pizza Tools",
    image:
      "https://www.abraollc.com/wp-content/uploads/2024/09/PIZZA-PASTA-SPECIALITY-TOOLS.jpg",
  },
  {
    id: 3,
    name: "SIM Tools",
    image: "https://m.media-amazon.com/images/I/61u-cUDuL3L._AC_SL1001_.jpg",
  },
  {
    id: 4,
    name: "Protective Lens",
    image:
      "https://img.drz.lazcdn.com/static/pk/p/7058700b3f0e0ddead51a5b6932da46c.jpg_720x720q80.jpg",
  },
  {
    id: 5,
    name: "Screen Protectors",
    image:
      "https://joyroom.pk/cdn/shop/products/JR-G02-Tempered-Glass-Screen-Protector-2-5D-Full-Screen-with-Black-Edge-for-iP-14-Pro-6-1-Eye-Protection-Joyroom-pk-305.jpg?v=1676292134&width=1445",
  },
  {
    id: 6,
    name: "Shorts",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsT4Pov-nwgMaFhJEI0Yw9yVybiyZGGNyUgQ&s",
  },
  {
    id: 7,
    name: "Casserole Pots",
    image:
      "https://img.drz.lazcdn.com/static/pk/p/b2336ce50dcc7c0342f6bf8260c1ff04.jpg_720x720q80.jpg",
  },
  {
    id: 8,
    name: "Hoodies & Sweatshirts",
    image:
      "https://content-management-files.canva.com/cdn-cgi/image/f=auto,q=70/e59878d9-a6ce-4ad8-a723-c588859daa1b/hoodies_hero_E0DBF12x.png",
  },
  {
    id: 9,
    name: "Toy Boxes & Organisers",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSy5bejG5WlAGHE6m5q1ZRxqhotDFWkuOdSAQ&s",
  },
  {
    id: 10,
    name: "Dog & Cat Electric Clippers",
    image: "https://m.media-amazon.com/images/I/61Ehy1Wp9RL.jpg",
  },
  {
    id: 11,
    name: "Dining Sets",
    image:
      "https://habitt.com/cdn/shop/products/tables-furniture-wooden-arm-dining-table-36350891393242.jpg?v=1662976521",
  },
  {
    id: 12,
    name: "Microphones",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYStPRlu3pfeufQTokRH7BYguXI4g_cRHHaQ&s",
  },
  {
    id: 13,
    name: "Leashes & Harnesses",
    image: "https://m.media-amazon.com/images/I/71xgLaOGVpL.jpg",
  },
  {
    id: 14,
    name: "Paints",
    image:
      "https://bachaaparty.com/cdn/shop/files/DSC06946.jpg?v=1688712764&width=1080",
  },
  {
    id: 15,
    name: "Donate to Educate",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhfiYOsjBKbQgHSEsCR4RHkk-ZbzljaDxOEA&s",
  },
  {
    id: 16,
    name: "Coloring & Drawing",
    image:
      "https://i.ytimg.com/vi/v2Dn1R71DuE/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLAPViYpmxlBXMQEfb5AL8TuslIVlQ",
  },
];

const Categories = () => {
  return (
    <div style={{ marginTop: "30px" }}>
      {/* Header (container se bahir aur browser ka default color) */}
      <p
        style={{
          fontSize: "20px",
          fontWeight: "bold",
          marginBottom: "15px",
        }}
      >
        Categories
      </p>

      {/* Categories Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(8, 1fr)", // ek row me sirf 8
          gap: "0px", // bilkul chipki categories
          backgroundColor: "#fff",
          borderRadius: "8px",
          boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
          overflow: "hidden", // taake border overlap na kare
        }}
      >
        {categories.map((cat) => (
          <div
            key={cat.id}
            style={{
              border: "1px solid #eee",
              textAlign: "center",
              padding: "10px 5px", // block height choti
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = "0 2px 6px rgba(0,0,0,0.1)";
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.zIndex = "1";
              e.currentTarget.style.position = "relative";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = "none";
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.zIndex = "0";
            }}
          >
            <img
              src={cat.image}
              alt={cat.name}
              style={{
                width: "70px", // choti image
                height: "70px",
                objectFit: "contain",
                marginBottom: "6px",
              }}
            />
            <p style={{ fontSize: "12px", color: "#333" }}>{cat.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
