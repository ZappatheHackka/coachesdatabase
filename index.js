import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import session from "express-session";
import flash from "express-flash";
import bodyParser from "body-parser";

import "./src/models/db-connect.js";

import authRoutes from './routes/authRoutes.js';
import clientRoutes from './routes/clientRoutes.js';
import passwordRoutes from './routes/passwordRoutes.js';
import feedbackRoutes from './routes/feedbackRoutes.js';
import { isAuthenticated } from './routes/middleware.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}));
app.use(flash());


app.use(authRoutes);
app.use(clientRoutes);
app.use(passwordRoutes);
app.use(feedbackRoutes);


app.get('/', (req, res) => {
  res.render('login.ejs', { message: req.flash('error'), success: req.flash('success')});
});


app.get('/about', isAuthenticated, (req, res)  => {
  res.render('about.ejs');
});

app.listen(port, () => {
  console.log(`\n🚀 App listening on port ${port}`);
});
