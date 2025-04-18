import nodemailer from "nodemailer";
import express from "express";
import dotenv from "dotenv";

const router = express.Router();
dotenv.config();

let transporter = nodemailer.createTransport({
    host: "idhoops.com",
    port: 587,
    secure: false, // use TLS, not SSL
    auth: {
      user: "chris@idhoops.com",
      pass: process.env.NM_PASS
    },
    tls: {
        rejectUnauthorized: false
    }
  });
  
let message = {
    from: "chris@idhoops.com",
    to: "chriscottone1@gmail.com",
    subject: "Testing Pals",
    text: "You are that guy"
  };
  
  // Verify connection config
transporter.verify((error, success) => {
    if (error) {
      console.log("Verification error:", error);
    } else {
      console.log("✅ Server is ready to send email");
      
      // Optional: Send the email right after verifying
      transporter.sendMail(message, (err, info) => {
        if (err) {
          console.error("Error sending mail:", err);
        } else {
          console.log("✉️ Message sent:", info.response);
        }
      });
    }
});