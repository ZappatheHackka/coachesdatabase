import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import bcrypt from "bcrypt";
import flash from "express-flash";
import session from "express-session";
import bodyParser from "body-parser";
import "./src/models/db-connect.js";
import authRoutes from './routes/authRoutes.js';
import clientRoutes from './routes/clientRoutes.js'
import { isAuthenticated, isAdmin } from './routes/middleware.js';
import { Coach, Client, Stats, Code,  } from "./src/models/models.js";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const port = 3000;
const saltRounds = 10;

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded ({ extended: true}));
app.use(session({
    secret: 'h',
    resave: false,
    saveUninitialized: true
}));
app.use(flash());
app.use(authRoutes);
app.use(clientRoutes);

app.get("/home", isAuthenticated, (req, res) => {
    res.render("home.ejs", { message: req.flash('error') });
});

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});