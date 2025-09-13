// EmailSender.jsx
import React, { useState } from "react";
import { sendWelcomeEmail, sendOrderEmail } from "./emailService";

const EmailSender = () => {
  const [userName, setUserName] = useState("");
  const [orderId, setOrderId] = useState("");
  const [totalAmount, setTotalAmount] = useState("");

  const handleWelcome = async (e) => {
    e.preventDefault();
    try {
      await sendWelcomeEmail(userName);
      alert("Welcome email sent!");
    } catch (err) {
      alert("Error sending welcome email!");
    }
  };

  const handleOrder = async (e) => {
    e.preventDefault();
    try {
      await sendOrderEmail({
        to_name: loggedInUser.name,
        to_email: loggedInUser.email,
        order_id: orderId,
        total_amount: totalAmount,
      });
      alert("Order email sent!");
    } catch (err) {
      console.error("Failed to send order email:", err);
      alert("Error sending order email!");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>EmailJS Demo</h2>

      <form onSubmit={handleWelcome}>
        <h3>Send Welcome Email</h3>
        <input
          type="text"
          placeholder="User Name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          required
        />
        <button type="submit">Send Welcome Email</button>
      </form>

      <hr />

      <form onSubmit={handleOrder}>
        <h3>Send Order Confirmation Email</h3>
        <input
          type="text"
          placeholder="User Name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Order ID"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Total Amount"
          value={totalAmount}
          onChange={(e) => setTotalAmount(e.target.value)}
          required
        />
        <button type="submit">Send Order Email</button>
      </form>
    </div>
  );
};

export default EmailSender;
