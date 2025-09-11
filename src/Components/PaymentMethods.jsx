import React from "react";

const PaymentMethods = () => {
  const paymentLogos = [
    {
      name: "COD",
      src: "	https://img.lazcdn.com/us/domino/ee9913f8-8258-4382-b97e-e2047ce93012_PK-139-84.png",
    },
    {
      name: "Visa",
      src: "https://img.lazcdn.com/us/domino/78355368-8518-4b88-9f8e-e5751ee0863a_PK-140-84.png",
    },
    {
      name: "MasterCard",
      src: "https://img.lazcdn.com/us/domino/5ba8a652-1445-45cb-a2a5-ed6043004243_PK-63-48.png",
    },
    {
      name: "Easy Paisa",
      src: "https://img.lazcdn.com/us/domino/dd8e0447-8052-44f3-8ab2-b24c56a2491f_PK-139-84.png",
    },
    {
      name: "Daraz Wallet",
      src: "	https://img.lazcdn.com/us/domino/e5c3cd93-b796-410f-9bfd-fbfdaa055149_PK-144-84.png",
    },
    {
      name: "JazzCash",
      src: "https://img.lazcdn.com/us/domino/56915ba8-b2c0-4caf-b3a1-7e0f3d2d45cf_PK-139-84.png",
    },
    {
      name: "UnionPay",
      src: "	https://img.lazcdn.com/us/domino/75489476-3c86-44ed-bf81-8b0579d56e1c_PK-139-84.png",
    },

    {
      name: "HBL",
      src: "	https://img.lazcdn.com/us/domino/6668ff96-bf9a-40bd-8ce4-f7f7c0bee385_PK-144-84.png",
    },
    {
      name: "EMI",
      src: "https://img.lazcdn.com/us/domino/7237a412-04cc-4571-a200-44f6f847a9da_PK-144-84.png",
    },
  ];
  const verifiedLogos = [
    {
      name: "PCI DSS",
      src: "https://img.drz.lazcdn.com/g/tps/imgextra/i4/O1CN01ZaMORP1I3qlBom0V2_!!6000000000838-2-tps-73-41.png",
    },
  ];
  const intlCountries = [
    {
      name: "Pakistan",
      src: "https://img.lazcdn.com/us/domino/1fe7d756-2469-4d8e-82b2-d5eb7cbad875_PK-84-84.png",
    },
    {
      name: "Bangladesh",
      src: "https://img.lazcdn.com/us/domino/05a4ef2c-095c-407d-9295-aa45b5412de0_PK-84-84.png",
    },
    {
      name: "Sri Lanka",
      src: "https://img.lazcdn.com/us/domino/5536488d-c32a-44eb-8307-ed6651d907da_PK-84-84.png",
    },
    {
      name: "Myanmar",
      src: "https://img.lazcdn.com/us/domino/8896f696-b36f-4cb1-8576-2e86eed05046_PK-84-84.png",
    },
    {
      name: "Nepal",
      src: "https://img.lazcdn.com/us/domino/39f7f111-619f-47cd-993c-a551aaed15fd_PK-86-86.png",
    },
  ];
  const socialIcons = [
    {
      name: "Facebook",
      src: "https://cdn-icons-png.flaticon.com/512/733/733547.png",
      link: "https://facebook.com",
    },
    {
      name: "Twitter",
      src: "https://cdn-icons-png.flaticon.com/512/733/733579.png",
      link: "https://twitter.com",
    },
    {
      name: "Instagram",
      src: "https://cdn-icons-png.flaticon.com/512/2111/2111463.png",
      link: "https://instagram.com",
    },
    {
      name: "YouTube",
      src: "https://cdn-icons-png.flaticon.com/512/1384/1384060.png",
      link: "https://youtube.com",
    },
    {
      name: "Blog",
      src: "https://img.lazcdn.com/us/domino/cea1aedb-aa69-44d5-bbaf-ca5901797dea_PK-76-76.png",
      link: "https://youtube.com",
    },
  ];

  return (
    <div style={{ marginTop: "30px" }}>
      {/* Row 1: Payment + Verified */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "40px",
          marginBottom: "40px",
        }}
      >
        {/* Payment Methods */}
        <div style={{ flex: "1" }}>
          <h3
            style={{
              fontSize: "16px",
              fontWeight: "600",
              color: "#0f136d",
              marginLeft: "30px",
            }}
          >
            Payment Methods
          </h3>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "12px",
              marginTop: "15px",
              marginLeft: "30px",
            }}
          >
            {paymentLogos.map((logo, index) => (
              <React.Fragment key={index}>
                <img
                  src={logo.src}
                  alt={logo.name}
                  title={logo.name}
                  style={{
                    height: "30px",
                    backgroundColor: "#fff",
                    padding: "5px",

                    borderRadius: "6px",
                  }}
                />
                {logo.name === "JazzCash" && (
                  <div style={{ flexBasis: "100%", height: "0" }}></div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Verified By */}
        <div style={{ flex: "1" }}>
          <h3 style={{ fontSize: "16px", fontWeight: "600", color: "#0f136d" }}>
            Verified by
          </h3>
          <div style={{ display: "flex", gap: "12px", marginTop: "15px" }}>
            {verifiedLogos.map((logo, index) => (
              <img
                key={index}
                src={logo.src}
                alt={logo.name}
                title={logo.name}
                style={{
                  height: "30px",
                  backgroundColor: "#fff",
                  padding: "5px",
                  border: "1px solid #ddd",
                  borderRadius: "6px",
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Row 2: International + Follow Us */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "40px",
        }}
      >
        {/* Daraz International */}
        <div style={{ flex: "1" }}>
          <h3
            style={{
              fontSize: "16px",
              fontWeight: "600",
              color: "#0f136d",
              marginLeft: "30px",
            }}
          >
            Daraz International
          </h3>
          <div
            style={{
              display: "flex",
              gap: "12px",
              marginTop: "15px",
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            {intlCountries.map((country, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                  cursor: "pointer",
                  marginLeft: "30px",
                }}
              >
                <img
                  src={country.src}
                  alt={country.name}
                  title={country.name}
                  style={{
                    height: "28px",
                    width: "28px",
                    borderRadius: "50%",
                    border: "1px solid #ddd",
                    background: "#fff",
                  }}
                />
                <span
                  style={{
                    fontSize: "12px",
                    color: "#0f136d",
                    textDecoration: "none",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.textDecoration = "underline")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.textDecoration = "none")
                  }
                >
                  {country.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Follow Us */}
        <div style={{ flex: "1" }}>
          <h3 style={{ fontSize: "16px", fontWeight: "600", color: "#0f136d" }}>
            Follow Us
          </h3>
          <div style={{ display: "flex", gap: "15px", marginTop: "15px" }}>
            {socialIcons.map((icon, index) => (
              <a
                key={index}
                href={icon.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={icon.src}
                  alt={icon.name}
                  title={icon.name}
                  style={{ height: "30px", width: "30px" }}
                />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethods;
