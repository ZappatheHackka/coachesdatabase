import { Coach, Code } from '../src/models/models.js'
import express from "express";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

const router = express.Router();
const transporter = nodemailer.createTransport({
    host: "idhoops.com",
    port: 587,
    secure: false,
    auth: {
        user: "chris@idhoops.com",
        pass: process.env.NM_PASS,
    },
    tls: {
        rejectUnauthorized: false
    }
});
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
            const code = Math.floor(100000 + Math.random() * 900000).toString();
            const now = new Date();
            const expires = new Date(now.getTime() + 20 * 60 * 1000); // 6-digit numeric
            let hashed_code = await bcrypt.hash(code, saltRounds);
            const user_Id = user.dataValues.id;
            req.session.coach = user_Id;
            let codeObject = await Code.create({
                code: hashed_code,
                coachID: user_Id,
                used: false,
                expiry: expires
            });
            await transporter.sendMail({
                from:'"Inner Drive Hoops Coach Database" <chris@idhoops.com>',
                to: `${givenEmail}`,
                subject: "Password Reset Code",
                text: `${user.firstname},\n\nYour password reset code is ${code}.\n\nUse this code within 20 minutes to reset your password.`
            });
            req.session.codeId = codeObject.codeid; 
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
        email: email,
        error: req.flash('error')
    });
});


router.post('/newpass', async (req, res) => {
    let givenCode = req.body["newcode"];
    let coachId = req.session.coach;
    let codeId = req.session.codeId;
    let firstPass = req.body["pass1"];
    let confirmPass = req.body["pass2"];
    let now = new Date();
    try {
        let codeObj = await Code.findOne({
            where: {
               codeid: codeId,
               coachID: coachId 
            }
        });
        if (codeObj) {
            if (codeObj.expiry > now ) {
                let dbCode = codeObj.code;
                let codesMatch = await (bcrypt.compare(givenCode, dbCode));
                if (codesMatch === true) {
                    if (firstPass === confirmPass) {
                        let coach = await Coach.findByPk(coachId);
                        let newPassHashed = await bcrypt.hash(firstPass, saltRounds);
                        coach.passwordHashed = newPassHashed;
                        await coach.save();
                        await codeObj.destroy();
                        req.flash("success", "Password successfully changed!")
                        return res.redirect('/');
                    }
                    else {
                        req.flash("error", "Passwords Do Not Match.");
                        return res.redirect('/success');
                    }
                }
                else {
                    req.flash("error", "The Code You Entered Does Not Match.");
                    return res.redirect('/success');
                }    
            }
            else {
                req.flash("error", "Code expired. Please request a new one.");
                await codeObj.destroy();
                return res.redirect('/success');
            }    
        }
    }  catch (error) {
        console.log(`Could not change password, error: ${error}`);
        return res.redirect('/success');
    }
});

export default router;