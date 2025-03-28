import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import nodemailer from "nodemailer";  

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(cors({
    origin: "*",  
    methods: "GET,POST",
    allowedHeaders: "Content-Type"
}));

 
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

 
app.use(express.static(path.join(__dirname, "../frontend")));

 
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend", "portfolio.html"));  
});

 
app.get("/api", (req, res) => {
  res.send("Backend is working!");
});

 
app.post("/contact", async (req, res) => {
  const { name, email, message } = req.body;
  console.log("Received Contact Form:", { name, email, message });

  if (!name || !email || !message) {
    console.log("Error: Missing fields");
    return res.status(400).json({ message: "All fields are required!" });
  }

  try {
     
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER, 
        pass: process.env.GMAIL_PASS,  
      },
    });

    
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: process.env.GMAIL_USER,  
      subject: "New Contact Form Submission",
      text: `You received a new message:

      Name: ${name}
      Email: ${email}
      
      Message:
      ${message}`,
    };

   
    await transporter.sendMail(mailOptions);
    console.log("Email Sent Successfully!");

    res.json({ message: "Your message has been sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ message: "Failed to send message. Please try again later." });
  }
});

 
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});




