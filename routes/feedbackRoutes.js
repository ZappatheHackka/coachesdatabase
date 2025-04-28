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
        console.log(`Cannot update client ratings. Error: ${error}`);
    }
});

router.post('/editRating/:rid/:cid', isAuthenticated, async (req, res) => {
    let ratingid = req.params.rid;
    let clientid = req.params.cid;
    let coachid = req.session.coachid;
    let { ballhandling, shooting, iq, passing, defense, finishing } = req.body;
    try {
        var rating = await ClientRatings.findByPk(ratingid);
        var coach = await Coach.findByPk(coachid);
        if (coachid !== rating.CoachId) {
            if (coach.isAdmin !== true) {
                req.flash("error", "You cannot edit another coach's ratings without Admin privileges.");
                return res.redirect(`/client/${clientid}`);
            }
        }
        rating.ball_handling = ballhandling;
        rating.shooting = shooting;
        rating.iq = iq;
        rating.passing = passing;
        rating.defense = defense;
        rating.finishing = finishing;
        await rating.save();
        res.redirect(`/client/${clientid}`);
    } catch (error) {
        console.log(`Cannot update client ratings. Error: ${error}`);
        res.redirect(`/client/${clientid}`);
    }
});

router.post('/deleteRating/:id/:cid', isAuthenticated, async (req, res) => {
    let ratingId = req.params.id;
    let clientId = req.params.cid;
    let coachid = req.session.coachid;
    try {
        const thisRating = await ClientRatings.findByPk(ratingId);
        const coach = await Coach.findByPk(coachid);
        if (coachid !== thisRating.CoachId) {
            if (coach.isAdmin !== true) {
                req.flash("error", "You cannot delete another user's ratings without Admin privileges.");
                return res.redirect(`/client/${clientId}`);
            }
        }
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
        res.redirect(`/client/${clientid}`);
    }
});


router.post('/editComment/:commentid/:clientid', isAuthenticated, async (req, res) => {
    let commentId = req.params.commentid;
    let clientId = req.params.clientid;
    let coachid = req.session.coachid;
    let { textcontent } = req.body;
    try {
        let comment = await Comment.findByPk(commentId);
        if (comment.CoachId !== coachid) {
            const coach = await Coach.findByPk(coachid);
            if (!coach.isAdmin) {
                req.flash("error", "You cannot edit another coach's comment unless you have Admin privileges.");
                return res.redirect(`/client/${clientId}`);
            }
        }
        comment.text = textcontent;
        await comment.save();
        res.redirect(`/client/${clientId}`);
    } catch (error) {
        console.log(`Could not edit comment, error: ${error}`);
        res.redirect(`/client/${clientId}`);
    }
});

router.post('/deleteComment/:commentid/:clientid', isAuthenticated, async (req, res) => {
    let commentId = req.params.commentid;
    let clientId = req.params.clientid;
    let coachid = req.session.coachid;
    try {
        let comment = await Comment.findByPk(commentId);
        if (comment.CoachId !== coachid) {
            const coach = await Coach.findByPk(coachid);
            if (!coach.isAdmin) {
                req.flash("error", "You cannot delete another coach's comment unless you have Admin privileges.");
                return res.redirect(`/client/${clientId}`);
            }
        }
        await comment.destroy();
        res.redirect(`/client/${clientId}`);
    } catch (error) {
        console.log(`Could not delete comment, error: ${error}`);
        res.redirect(`/client/${clientId}`);
    }
});

export default router;