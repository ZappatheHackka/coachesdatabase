import express from 'express';
import { Client, Coach, Comment, ClientRatings } from '../src/models/models.js';
import { isAuthenticated } from './middleware.js';

const router = express.Router();

router.post('/rate/:id', isAuthenticated, async (req, res) => {
    let clientid = req.params.id;
    let coachid = req.session.coachid;
    let { ballhandling, shooting, iq, passing, defense, finishing } = req.body;
    try {
        await ClientRatings.create({
            ball_handling: ballhandling,
            finishing: finishing,
            shooting: shooting,
            defense: defense,
            iq: iq,
            passing: passing,
            CoachId: coachid,
            ClientId: clientid
        });
        res.redirect(`/client/${clientid}`);
    } catch (error) {
        console.log(`Cannot updating client ratings. Error: ${error}`);
    }
});

export default router;