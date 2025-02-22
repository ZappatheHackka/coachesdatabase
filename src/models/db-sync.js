import connect from "./db-connect.js";
import dotenv from "dotenv";
import "./models.js";
import { Coach, Client, Stats, Comment } from "./models.js";

// Accessing env variables
dotenv.config();

// Forming connection to Database
async function initializeDatabase() {
    try {
        await connect.authenticate();
        console.log("Successfully connected to DB.");

        await connect.sync({ force: true });
        console.log("DB Synchronized");
    } catch (error) {
        console.error("Process failed, error:", error);
        process.exit(1);
    }
}

initializeDatabase();

export default initializeDatabase;