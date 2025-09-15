// emailService.js
import emailjs from "emailjs-com";

const SERVICE_ID = "service_ojsof6n";
const USER_ID = "XdYtRuWXE2f8wSN3z";
const WELCOME_TEMPLATE_ID = "template_2e6giwo";
const ORDER_TEMPLATE_ID = "template_facy0vl";

// Generic function to send email
export const sendEmail = (templateId, templateParams) => {
  return emailjs
    .send(SERVICE_ID, templateId, templateParams, USER_ID)
    .then((result) => {
      console.log("Email sent:", result.text);
      return result;
    })
    .catch((error) => {
      console.log("Email error:", error.text);
      throw error;
    });
};

// ✅ Exported Welcome Email function
export const sendWelcomeEmail = (userName, userEmail) => {
  const templateParams = {
    user_name: userName,
    signup_date: new Date().toLocaleDateString(),
    email: userEmail, // ← Pass the user’s email to match {{email}} in template
  };
  return sendEmail(WELCOME_TEMPLATE_ID, templateParams);
};

// ✅ Exported Order Confirmation Email function
export const sendOrderEmail = async ({
  user_name,
  user_email,
  order_id,
  total_amount,
}) => {
  if (!user_email) {
    throw new Error("Recipient email is required!");
  }

  try {
    const response = await emailjs.send(
      SERVICE_ID,
      ORDER_TEMPLATE_ID,
      {
        user_name,
        order_id,
        total_amount,
      },
      USER_ID
    );
    console.log("Order email sent:", response.text);
    return response;
  } catch (error) {
    console.error("Email error:", error);
    throw error;
  }

  return sendEmail(ORDER_TEMPLATE_ID, templateParams);
};
