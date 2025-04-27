import express from 'express';
import { Client, Coach, Comment, ClientRatings } from '../src/models/models.js';
import { isAuthenticated } from './middleware.js';

const router = express.Router();

// add and delete client ratings
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

router.post('/deleteRating/:id/:cid', isAuthenticated, async (req, res) => {
    let ratingId = req.params.id;
    let clientId = req.params.cid;
    try {
        const thisRating = await ClientRatings.findByPk(ratingId);
        await thisRating.destroy();
        res.redirect(`/client/${clientId}`);
    } catch (error) {
        console.log(`Could not delete rating, error: ${error}`);
        res.redirect(`/client/${clientId}`);
    }
});

// add, edit, delete comments

router.post('/comment/:id', isAuthenticated, async (req, res) => {
    let clientid = req.params.id;
    let coachid = req.session.coachid;
    const textContent = req.body['textcontent'];
    try {
        await Comment.create({
            CoachId: coachid,
            ClientId: clientid,
            text: textContent
        });
        res.redirect(`/client/${clientid}`);
    } catch (error) {
        console.log(`Could not add comment, error: ${error}`);
        res.redirect(`/client/${clientId}`);
    }
});

export default router;