import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import session from "express-session";
import flash from "express-flash";
import bodyParser from "body-parser";

import "./src/models/db-connect.js";
import { Coach, Client, Stats, Code } from "./src/models/models.js";

import authRoutes from './routes/authRoutes.js';
import clientRoutes from './routes/clientRoutes.js';
import passwordRoutes from './routes/passwordRoutes.js';
import { isAuthenticated } from './routes/middleware.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}));
app.use(flash());

// Routers
app.use(authRoutes);
app.use(clientRoutes);
app.use(passwordRoutes);

// Sample protected route
app.get("/home", isAuthenticated, (req, res) => {
  res.render("home.ejs", { message: req.flash('error') });
});


// Start server
app.listen(port, () => {
  console.log(`\n🚀 App listening on port ${port}`);
});
