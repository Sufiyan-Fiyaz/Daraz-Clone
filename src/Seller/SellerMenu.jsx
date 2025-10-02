// SellerMenu.jsx - Daraz Style (fixed country dropdown)
import React, { useState, useRef, useEffect } from "react";

const SellerMenu = () => {
  const [country, setCountry] = useState("Pakistan");
  const [language, setLanguage] = useState("English");
  const [openCountry, setOpenCountry] = useState(false);
  const countryRef = useRef(null);

  const countries = [
    { name: "Pakistan", flag: "https://flagcdn.com/w40/pk.png" },
    { name: "Bangladesh", flag: "https://flagcdn.com/w40/bd.png" },
    { name: "Sri Lanka", flag: "https://flagcdn.com/w40/lk.png" },
    { name: "Nepal", flag: "https://flagcdn.com/w40/np.png" },
    { name: "Myanmar", flag: "https://flagcdn.com/w40/mm.png" },
  ];

  const languages = ["English", "Urdu", "Bangla", "Sinhala", "Nepali"];

  // close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (countryRef.current && !countryRef.current.contains(e.target)) {
        setOpenCountry(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Styles
  const navbarStyle = {
    width: "100%", // use 100% (not 100vw) to avoid horizontal scrollbars on mobile
    height: "100px",
    backgroundColor: "#ffffff",
    display: "flex",
    alignItems: "center",
    padding: "0 24px",
    color: "#1a1a1a",
    boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
    position: "fixed",
    top: 0,
    left: 0,
    zIndex: 1000,
    borderBottom: "1px solid #f5f5f5",
    fontFamily: "'Roboto', 'Arial', sans-serif",
    boxSizing: "border-box",
  };

  const logoStyle = {
    height: "48px",
    width: "auto",
    marginLeft: "40px",
  };

  const rightSideStyle = {
    marginLeft: "auto",
    display: "flex",
    alignItems: "center",
    gap: "14px",
  };

  const selectStyle = {
    padding: "6px 12px",
    borderRadius: "6px",
    border: "1px solid #e6e6e6",
    outline: "none",
    color: "#424242",
    backgroundColor: "#ffffff",
    fontSize: "14px",
    fontFamily: "'Roboto', 'Arial', sans-serif",
    cursor: "pointer",
    minWidth: "120px",
    height: "38px",
    transition: "all 0.15s ease",
  };

  // custom dropdown styles for country
  const dropdownWrapper = {
    position: "relative",
    width: "180px",
    userSelect: "none",
    fontFamily: "'Roboto', sans-serif",
  };

  const selectedStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "10px",
    padding: "6px 10px",
    border: "1px solid #e6e6e6",
    borderRadius: "6px",
    cursor: "pointer",
    backgroundColor: "#fff",
    height: "38px",
    boxSizing: "border-box",
  };

  const selectedLeft = {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    overflow: "hidden",
  };

  const flagImgStyle = {
    width: "24px",
    height: "16px",
    objectFit: "cover",
    display: "block",
  };

  const caretStyle = {
    marginLeft: "8px",
    transform: openCountry ? "rotate(180deg)" : "rotate(0deg)",
    transition: "transform 150ms ease",
    fontSize: "30px",
    color: "#666",
  };

  const optionsStyle = {
    position: "absolute",
    top: "calc(100% + 8px)",
    left: 0,
    width: "100%",
    backgroundColor: "#fff",
    border: "1px solid #e6e6e6",
    borderRadius: "8px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
    zIndex: 2000,
    maxHeight: "220px",
    overflowY: "auto",
  };

  const optionStyle = {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "8px 10px",
    cursor: "pointer",
    fontSize: "14px",
    color: "#333",
  };

  return (
    <nav style={navbarStyle}>
      {/* Logo */}
      <img
        src="https://img.alicdn.com/imgextra/i3/O1CN01ovcTAV1WBY7oOmozh_!!6000000002750-55-tps-323-127.svg"
        alt="Daraz"
        style={logoStyle}
      />

      {/* Right side */}
      <div style={rightSideStyle}>
        {/* Country Selector (fixed custom dropdown) */}
        <div style={dropdownWrapper} ref={countryRef}>
          <div
            role="button"
            tabIndex={0}
            aria-haspopup="listbox"
            aria-expanded={openCountry}
            onClick={() => setOpenCountry((s) => !s)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setOpenCountry((s) => !s);
              } else if (e.key === "Escape") {
                setOpenCountry(false);
              }
            }}
            style={selectedStyle}
          >
            <div style={selectedLeft}>
              <img
                src={countries.find((c) => c.name === country)?.flag}
                alt={country}
                style={flagImgStyle}
                onError={(e) => {
                  // hide broken image if any
                  e.currentTarget.style.display = "none";
                }}
              />
              <span
                style={{
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {country}
              </span>
            </div>

            <span style={caretStyle}>▾</span>
          </div>

          {openCountry && (
            <div role="listbox" style={optionsStyle}>
              {countries.map((c) => (
                <div
                  key={c.name}
                  role="option"
                  aria-selected={c.name === country}
                  onClick={() => {
                    setCountry(c.name);
                    setOpenCountry(false);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      setCountry(c.name);
                      setOpenCountry(false);
                    }
                  }}
                  style={{
                    ...optionStyle,
                    background: c.name === country ? "#fbf7f2" : "transparent",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = "#fafafa")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background =
                      c.name === country ? "#fbf7f2" : "transparent")
                  }
                >
                  <img
                    src={c.flag}
                    alt={c.name}
                    style={{
                      width: "28px",
                      height: "18px",
                      objectFit: "cover",
                    }}
                    onError={(e) => (e.currentTarget.style.display = "none")}
                  />
                  <span style={{ flex: 1 }}>{c.name}</span>
                  {c.name === country && (
                    <span style={{ color: "#f57c00" }}>✓</span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Language Selector (native) */}
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          style={selectStyle}
          onFocus={(e) => {
            e.target.style.borderColor = "#f57c00";
            e.target.style.boxShadow = "0 0 0 3px rgba(245,124,0,0.06)";
          }}
          onBlur={(e) => {
            e.target.style.borderColor = "#e6e6e6";
            e.target.style.boxShadow = "none";
          }}
        >
          {languages.map((lang) => (
            <option key={lang} value={lang}>
              {lang}
            </option>
          ))}
        </select>
      </div>
    </nav>
  );
};

export default SellerMenu;
