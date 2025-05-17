import express from "express";
import bcrypt from "bcrypt";
import { Op, literal } from "sequelize";
import { Coach, Client } from '../src/models/models.js';
import { isAuthenticated, isAdmin } from './middleware.js';

const router = express.Router();
const saltRounds = 10;

// Login page


router.get("/home", isAuthenticated, async (req, res) => {
    let query = req.query.query;
    if (query) {
        try {
            const clients = await Client.findAll({
                where: {
                    [Op.or]: [
                        { firstname: { [Op.iLike]: `%${query}%`} },
                        { lastname: { [Op.iLike]: `%${query}%`} },
                        { email: { [Op.iLike]: `%${query}%`} },
                        { cellphone: { [Op.iLike]: `%${query}%`} },
                        { parent: { [Op.iLike]: `%${query}%`} },
                        literal(`CAST(age AS TEXT) ILIKE '%${query}%'`)
                    ]
                },
                order: [
                    [
                        literal(`
                            LEAST(
                                CASE WHEN POSITION('${query}' IN firstname) > 0 THEN POSITION('${query}' IN firstname)
                                    ELSE 9999 END,
                                CASE WHEN POSITION('${query}' IN lastname) > 0 THEN POSITION('${query}' IN lastname) + 5
                                    ELSE 9999 END,
                                CASE WHEN POSITION('${query}' IN parent) > 0 THEN POSITION('${query}' IN parent) + 10
                                    ELSE 9999 END,
                                CASE WHEN POSITION('${query}' IN email) > 0 THEN POSITION('${query}' IN email) + 15
                                    ELSE 9999 END,
                                CASE WHEN POSITION('${query}' IN cellphone) > 0 THEN POSITION('${query}' IN cellphone) + 20
                                    ELSE 9999 END,
                                CASE WHEN POSITION('${query}' IN CAST(age AS TEXT)) > 0 THEN POSITION('${query}' IN CAST(age AS TEXT)) + 25
                                    ELSE 9999 END
                                )
                            `),
                        
                        'ASC'
                    ]
                ]
            });
            res.render("home.ejs", {
                clients,
                query,
                message: req.flash('error')
            });
        } catch (error) {
        req.flash('error', `Failed to fetch clients from database: ${error}`);
        res.redirect('/');
        }
    } else {
        let query;
        try {
        const clients = await Client.findAll({
            order: [['clientid', 'DESC']]
        });
        res.render("home.ejs", { 
            clients,
            query,
            message: req.flash('error'),
            });
        } catch (error) {
        req.flash('error', `Failed to fetch clients from database: ${error}`);
        res.redirect('/');
        }
    }
});


router.get('/logout', (req, res) => {
    req.session.userid = null;
    req.session.adminStatus = null;
    res.redirect('/');
});


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
                req.session.coachid = user.id;
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
