import { Model } from "sequelize";
import { DataTypes } from "sequelize";
import sequelize from "./db-connect.js";
import initializeDatabase from "./db-sync.js";

// creating classes for Coaches and Clients based on sequelize's "Model" class--an abstraction of a SQL table

class Coach extends Model {}
class Client extends Model {}
class Stats extends Model {}

// // Defining table fields for Coaches

Coach.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        unique: true,
        primaryKey: true
    },
    firstname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastname: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
}, {
    sequelize,
    modelName: "Coaches",
    freezeTableName: true
});

// Defining table fields for Clients

Client.init({
    clientid: {
        type: DataTypes.INTEGER,
        unique: true,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    cellphone: {
        type: DataTypes.INTEGER,
        unique: true,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: false
    },
    parent: {
        type: DataTypes.STRING,
        unique: false,
        allowNull: true
    }
}, {
    sequelize,
    modelName: "Clients",
    freezeTableName: true
});

Stats.init({
    clientid: {
        type: DataTypes.INTEGER,
        unique: true,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    ball_handling: {
        type: DataTypes.INTEGER
    },
    finishing: {
        type: DataTypes.INTEGER
    },
    shooting: {
        type: DataTypes.INTEGER
    },
    iq: {
        type: DataTypes.INTEGER
    },
    defense: {
        type: DataTypes.INTEGER
    },
    passing: {
        type: DataTypes.INTEGER
    }
}, {
    sequelize,
    modelName: "Client Ratings",
    freezeTableName: true
});

initializeDatabase();

export { Coach, Client, Stats };