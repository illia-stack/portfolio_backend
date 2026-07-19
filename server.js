const express = require("express");
const cors = require("cors");
const { Resend } = require("resend");

const app = express();

app.use(cors({
  origin: "https://portfolio-frontend-a6d8.onrender.com",
  methods: ["POST"]
}));

app.use(express.json());


const resend = new Resend(process.env.RESEND_API_KEY);


// Test route
app.get("/", (req, res) => {
  res.send("API running");
});


// Contact form
app.post("/api/contact", async (req, res) => {

  const { name, email, message } = req.body;


  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      message: "All fields are required"
    });
  }


  if (!email.match(/^\S+@\S+\.\S+$/)) {
    return res.status(400).json({
      success: false,
      message: "Invalid email"
    });
  }


  try {

    await resend.emails.send({

      from: "Portfolio <onboarding@resend.dev>",

      to: [
        "illiashapshalov38@gmail.com"
      ],

      reply_to: email,

      subject: "New Portfolio Message",

      html: `
        <h3>New message from portfolio</h3>

        <p>
          <strong>Name:</strong> ${name}
        </p>

        <p>
          <strong>Email:</strong> ${email}
        </p>

        <p>
          <strong>Message:</strong>
        </p>

        <p>
          ${message}
        </p>
      `
    });


    return res.status(200).json({
      success: true,
      message: "Message sent successfully!"
    });


  } catch(error) {

    console.error(error);

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