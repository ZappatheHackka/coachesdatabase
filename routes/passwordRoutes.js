import { Coach, Code } from '../src/models/models.js'
const router = express.Router();

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
            const user_Id = user.dataValues.id;
            await Code.create({
                code: code,
                coachID: user_Id,
                used: false,
            });
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