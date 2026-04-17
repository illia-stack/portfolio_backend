const express = require("express");
const cors = require("cors");
const sgMail = require("@sendgrid/mail");

const app = express();

app.use(cors({
  origin: "https://portfolio-frontend-a6d8.onrender.com"
}));
app.use(express.json());

// SendGrid API Key
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Test route
app.get("/", (req, res) => {
  res.send("API running");
});

// Kontaktformular
app.post("/api/contact", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      message: "All fields required"
    });
  }

  const msg = {
    to: "illiashapshalov38@gmail.com",
    from: {
      email: "illiashapshalov38@gmail.com",
      name: "ILLIA"
    }, 
    subject: "New Portfolio Message",
    text: `
New message from portfolio:

Name: ${name}
Email: ${email}
Message: ${message}
    `,
  };

  try {
    await sgMail.send(msg);

    return res.status(200).json({
      success: true,
      message: "Message sent successfully!"
    });
  } catch (error) {
    console.error(error.response?.body || error);

    return res.status(500).json({
      success: false,
      message: "Email sending failed"
    });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});