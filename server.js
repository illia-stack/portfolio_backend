const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("API running");
});

// Kontaktformular
app.post("/api/contact", (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.json({ success: false, message: "All fields required" });
  }

  console.log("New message:", name, email, message);

  res.json({ success: true, message: "Message received!" });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});