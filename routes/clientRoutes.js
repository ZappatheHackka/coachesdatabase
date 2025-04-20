import express from 'express';
import { Client } from '../src/models/models.js';
import { isAuthenticated } from './middleware.js';

const router = express.Router();

router.get('/addclient', isAuthenticated, (req, res) => {
    res.render("add_client.ejs");
});

router.post('/addclient', async (req, res) => {
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

router.get('/client/:id', async (req, res) => {
    try { 
        const clientId = req.params.id;
        const client = await Client.findByPk(clientId);
        if (!client) {
            return res.status(404).send("Client not found.");
        }
        res.render("client_profile.ejs", { thisClient : client });
    } catch (error) {
        console.log(`Could not load client profile. Error: ${error}`);
    } 
});

export default router;