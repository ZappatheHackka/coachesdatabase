import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "/static/index.html"));
    console.log(__filename);
    console.log(req.headers);
});

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});