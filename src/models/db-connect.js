import sequelize, { Sequelize } from "sequelize";
import dotenv from "dotenv";

// Configuring .env for credentials
dotenv.config();

// Initiating JS connection to DB
const connect = new Sequelize({
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    dialect: "postgres",
    logging: false
});

// Making the sequelize instance available to the rest of the files 
export default connect