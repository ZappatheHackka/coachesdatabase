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

const isAdmin = (req, res, next) => {
    if (req.session.adminStatus) {
        return next();
    }
    req.flash('error', 'You must have Admin permissions to view this page');
    res.redirect('/home');
}

// Login page
app.get('/', (req, res) => {
    res.render('login.ejs', { message: req.flash('error')});
});

app.get('/logout', (req, res) => {
    req.session.userid = null;
    req.session.adminStatus = null;
    res.redirect('/');
})

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
                req.session.adminStatus = user.dataValues.isAdmin;
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
    res.render("home.ejs", { message: req.flash('error') });
});

app.get("/signup", isAuthenticated, isAdmin, async (req, res) => {
    res.render("register_coach.ejs");
});

app.post("/signup", isAuthenticated, isAdmin, async (req, res) => {
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
        if (error.name === "SequelizeUniqueConstraintError") {
            let violatedConstraints = error.errors.map(err => err.path);
            res.render("register_coach.ejs", { 
                content: false, 
                error: violatedConstraints,
                });
            return;
        }
        console.log(`Coach creation process failed, error: ${error}`);
        res.render("register_coach.ejs", { content: false, error: error });
        return;
    }
});

app.get('/addclient', isAuthenticated, (req, res) => {
    res.render("add_client.ejs");
});

app.post('/addclient', async (req, res) => {
    let fname = req.body['fname'];
    let lname = req.body['lname'];
    let age = req.body["age"];
    let email = req.body['email'];
    let cellphone = req.body['cellphone'];
    let parents = req.body['parents'];
    try {
        await Client.create({
            firstname: fname,
            lastname: lname,
            age: age,
            email: email,
            cellphone: cellphone,
            parent: parents
        });
        res.render("add_client.ejs", {
            content: true,
            fname: fname,
            lname: lname,
            age: age,
            email: email,
            cellphone: cellphone,
            parents: parents
        });
    } catch (error) {
        if (error.name === "SequelizeUniqueConstraintError") {
            let violatedConstraints = error.errors.map(err => err.path);
            res.render('add_client.ejs', { 
                content: false, 
                error: violatedConstraints,
                fname: " ",
                lname: " ",
                age: " ",
                email: " ",
                cellphone: " ",
                parents: " "
                });
            return;
        }
        console.log(`Client creation process failed, error: ${error}`);
        res.render("add_client.ejs", { content: true, error: error });
        return;
    }
});

app.get('/pass', (req, res) => {
    res.render("pass_reset.ejs", { message: req.flash('error') });
});

app.post('/resetpass', async (req, res) => {
    let givenEmail = req.body['email'];
    try {
        let dbEmail = await Coach.findOne({
            where: {
                email: givenEmail
            }
        });
        if (dbEmail) {
            console.log("thending email thir!!!!");
        }
        else {
            req.flash('error', 'Email not registered.');
            res.redirect('/pass');
        }
    }
    catch (error) {
        console.log(`Error: ${error}`);
        res.redirect('/pass');
    }
});

app.get('/profiles', (req, res) => {
    res.render("client_profile.ejs");
});

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});

// const coaches = await Coach.findAll();
//     res.render("login.ejs", {
//         content : coaches
//     });