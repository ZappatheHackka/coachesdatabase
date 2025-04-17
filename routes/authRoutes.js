import express from "express";
import bcrypt from "bcrypt";
import { Coach } from '../src/models/models.js';
import { isAuthenticated, isAdmin } from './middleware.js';


const router = express.Router();
const saltRounds = 10;

// Login page
router.get('/', (req, res) => {
    res.render('login.ejs', { message: req.flash('error')});
});


router.get('/logout', (req, res) => {
    req.session.userid = null;
    req.session.adminStatus = null;
    res.redirect('/');
})


router.post('/login', async (req, res) => {
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



router.get("/signup", isAuthenticated, isAdmin, async (req, res) => {
    res.render("register_coach.ejs");
});


router.post("/signup", isAuthenticated, isAdmin, async (req, res) => {
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


export default router;