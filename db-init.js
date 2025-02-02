import connect from "./database.mjs";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Accessing env variables
dotenv.config();

async function initializeDatabase() {
    try {
        await connect.authenticate();
        console.log("Successfully connected to DB.");

        await connect.sync();
        console.log("DB Synchronized");
    } catch (error) {
        console.error("Process failed, error:", error);
        process.exit(1);
    }
}

if (import.meta.url === fileURLToPath(process.argv[1])) {
    // Run the initialization
    initializeDatabase();
}

// Export the function using ES module syntax
export default initializeDatabase;