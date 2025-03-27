import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import User from "./models/User.js"; 

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(cors());

const DbUrl = process.env.MONGO_URI;

// Database Connection
main()
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("MongoDB Connection Error:", err));

async function main() {
  await mongoose.connect(DbUrl);
}

// Test Route
app.get("/", (req, res) => {
  res.send(" Backend is working!");
});

// Contact Form API
app.post("/contact", async (req, res) => {
  console.log("Received a request on /contact", req.body);

  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    console.log("Error: Missing fields");
    return res.status(400).json({ message: "All fields are required!" });
  }

  try {
    const newUser = new User({ name, email, message });
    await newUser.save();
    console.log("New Contact Message Saved!");
    res.json({ message: "Your message has been received!" });
  } catch (error) {
    console.error("Error saving to database:", error);
    res.status(500).json({ message: "Server error, please try again later." });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});


