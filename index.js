import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, "static")));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "/static/index.html"));
    console.log(__filename);
});

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});