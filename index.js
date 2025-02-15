import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
// import { Coach, Client, Stats } from "./src/models/models.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const port = 3000;
const password = "bamsketball";


app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded ({ extended: true}));


// Login page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"));
    console.log(__filename);
});

app.get("/success", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/home.html"));
})

app.post('/login', (req, res) => {
    if (req.body["username"] === password && req.body["password"] === password) {
        res.redirect("/success");
    }
    else {
        res.redirect('/');
    }
});

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});