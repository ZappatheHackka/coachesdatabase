import express from 'express';
import { Client, Coach, ClientRatings, Comment } from '../src/models/models.js';
import { isAuthenticated } from './middleware.js';

const router = express.Router();

router.get('/addclient', isAuthenticated, (req, res) => {
    res.render("add_client.ejs");
});

router.post('/addclient', isAuthenticated, async (req, res) => {
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

router.get('/client/:id', isAuthenticated, async (req, res) => {
    try { 
        const clientId = req.params.id;
        const client = await Client.findByPk(clientId, {
            include: {
                model: Coach,
                as: "Coaches"
            }
        });
        const clientCoaches = client.Coaches;
        const coaches = await Coach.findAll();
        const ratings = await ClientRatings.findAll({
            where: {
                ClientId: clientId 
            },
            include: { 
                model: Coach,
            }
        });
        const comments = await Comment.findAll({
            where: {
                ClientId: clientId
            },
            include: {
                model: Coach,
            }
        }); 
        if (!client) {
            return res.status(404).send("Client not found.");
        }
        res.render("client_profile.ejs", { thisClient : client, coaches, ratings, comments, clientCoaches: clientCoaches });
    } catch (error) {
        console.log(`Could not load client profile. Error: ${error}`);
    } 
});

router.post('/edit/:id', isAuthenticated, async (req, res) => {
    const clientId = req.params.id;
    let { firstname, lastname, age, email, cellphone, parent } = req.body;
    const client = await Client.findByPk(clientId);
    if (firstname !== client.firstname) {
        client.firstname = firstname;
    }
    if (lastname !== client.lastname) {
        client.lastname = lastname;
    }
    if (age !== client.age) {
        client.age = age;
    }
    if (email !== client.email) {
        client.email = email;
    }
    if (cellphone !== client.cellphone) {
        client.cellphone = cellphone;
    }
    if (parent !== client.parent) {
        client.parent = parent;
    }
    await client.save();
    res.redirect(`/client/${clientId}`);
});

// Trainer info routes

router.post('/assign-coach/:id/', isAuthenticated, async (req, res) => {
    let clientId = req.params.id;
    let coachId = req.body.coachId;
    if (!coachId || !clientId) {
        console.error("Missing coachId or clientId!");
        return res.status(400).send("Invalid assignment data.");
    }
    try {
        const coach = await Coach.findByPk(coachId);
        const client = await Client.findByPk(clientId);
        await client.addCoach(coach);

        res.redirect(`/client/${clientId}`);
    } catch (error) {
        console.log(`Could not update trainer list, error: ${error}`);
    }
});

router.post('/delete-coach/:id/:cid', isAuthenticated, async (req, res) => {
    var delcoachId = req.params.id;
    var clientId = req.params.cid;
    try {
        let clientObj = await Client.findByPk(clientId);
        let delCoach = await Coach.findByPk(delcoachId);
        await clientObj.removeCoach(delCoach);
        res.redirect(`/client/${clientId}`);
    } catch (error) {
        console.log(`Cannot delete coach, error: ${error}`);
    }
});

export default router;