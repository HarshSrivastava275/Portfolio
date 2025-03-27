import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";
import User from "./models/User.js";

const app = express();
const PORT = 8080;
const DbUrl = process.env.MONGO_URI;

app.use(express.json());
app.use(cors());

// Database Connection
main()
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("MongoDB Connection Error:", err));

async function main() {
  await mongoose.connect(DbUrl);
}

// Get directory paths (needed for serving static files)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 🚀 Serve static frontend files
app.use(express.static(path.join(__dirname, "../frontend")));

// 🏠 Serve frontend for any unknown route
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend", "portfolio.html")); // Change "portfolio.html" to "index.html" if needed
});

// ✅ Test Route
app.get("/api", (req, res) => {
  res.send("Backend is working!");
});

// 📩 Contact Form API
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

// 🚀 Start Server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});



