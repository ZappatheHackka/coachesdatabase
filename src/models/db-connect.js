import { Sequelize } from "sequelize";
import dotenv from "dotenv";

// Configuring .env for credentials
dotenv.config();

let connect;

// Initiating JS connection to DB
if (process.env.DATABASE_URL) {
    connect = new Sequelize(process.env.DATABASE_URL, {
      dialect: 'postgres',
      logging: false,
    });
  } else {
    connect = new Sequelize({
      database: process.env.DB_NAME,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      host: process.env.DB_HOST || 'localhost',
      dialect: 'postgres',
      logging: false,
    });
}

// Making the sequelize instance available to the rest of the files 
export default connect