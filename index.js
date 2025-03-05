import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import bcrypt from "bcrypt";
import flash from "express-flash";
import session from "express-session";
import bodyParser from "body-parser";
import "./src/models/db-connect.js";
import { Coach, Client, Stats } from "./src/models/models.js";


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

const isAuthenticated = (req, res, next) => {
    if (req.session.userid) {
        return next();
    }
    req.flash('error', 'You must be logged in to view this page!');
    res.redirect('/');
}

// Login page
app.get('/', (req, res) => {
    res.render('login.ejs', { message: req.flash('error')});
    console.log(__filename);
});

app.post('/login', async (req, res) => {
    let givenEmail = req.body["email"];
    let givenPass = req.body["password"]
    try {
        let user = await Coach.findOne({
            where: {
                email: givenEmail
            }
        });
        if (user) {
            let dbPass = user.dataValues.passwordHashed;
            let canEnter = await (bcrypt.compare(givenPass, dbPass));
            if (canEnter === true) 
                {
                req.session.userid = user.dataValues.id;
                return res.redirect("/home");
                }
            else {
                req.flash('error', 'Invalid password.');
                return res.redirect('/');
            }
            }
        else {
            req.flash('error', 'User not found.')
            return res.redirect('/');
            }
        }
    catch (error) {
        req.flash('error', `Failed to login, error: ${error}`);
        return res.redirect('/');
    } 
});

app.get("/home", isAuthenticated, (req, res) => {
    res.render("home.ejs");
});

app.get("/signup", isAuthenticated, async (req, res) => {
    res.render("register_coach.ejs");
});

app.post("/signup", isAuthenticated, async (req, res) => {
    let fname = req.body["fname"];
    let lname = req.body["lname"];
    let email = req.body['email'];
    let adminStatus = !!req.body["isAdmin"]; // Converts undefined to false
    let password = req.body["password"];
    try {
        let hash = await bcrypt.hash(password, saltRounds);
        await Coach.create({
            firstname: fname,
            lastname: lname,
            email: email,
            passwordHashed: hash,
            isAdmin: adminStatus
        });
        res.render("register_coach.ejs", { 
            content: true, 
            fname: fname,
            lname: lname,
            email: email,
            isAdmin: adminStatus,
            password: password 
        });
    }
    catch(error){
        console.log(`Coach creation process failed, error: ${error}`);
        res.render("register_coach.ejs", { content: true, error: error });
    }
});



app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});

// const coaches = await Coach.findAll();
//     res.render("login.ejs", {
//         content : coaches
//     });