import { Coach, Code } from '../src/models/models.js'
import express from "express";
import bcrypt from "bcrypt";

const router = express.Router();
const saltRounds = 10;

router.get('/pass', (req, res) => {
    res.render("pass_reset.ejs", { message: req.flash('error') });
});

router.post('/resetpass', async (req, res) => {
    let givenEmail = req.body['email'];
    try {
        let user = await Coach.findOne({
            where: {
                email: givenEmail
            }
        });
        if (user) {
            const code = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit numeric
            let hashed_code = await bcrypt.hash(code, saltRounds);
            const user_Id = user.dataValues.id;
            req.session.coach = user_Id;
            let codeObject = await Code.create({
                code: hashed_code,
                coachID: user_Id,
                used: false,
            });
            req.session.codeId = codeObject.codeid; 
            console.log("thending email thir!!!!");
            req.session.userEmail = givenEmail;
            res.redirect(`/success`);
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

router.get('/success', (req, res) => {
    let email = req.session.userEmail;
    res.render("code_sent.ejs", {
        email: email
    });
});


router.post('/newpass', async (req, res) => {
    let givenCode = req.body["newcode"];
    let firstPass = req.body["pass1"];
    let confirmPass = req.body["pass2"];
    let coachID = req.session.coach;
});

export default router;