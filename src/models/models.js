import { Model } from "sequelize";
import { DataTypes } from "sequelize";
import sequelize from "./db-connect.js";
import initializeDatabase from "./db-sync.js";
import { configDotenv } from "dotenv";

// creating classes for Coaches and Clients based on sequelize's "Model" class--an abstraction of a SQL table

class Coach extends Model {}
class Client extends Model {}
class ClientRatings extends Model {}
class Comment extends Model {}
class Code extends Model {}

// Defining table fields for Coaches

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
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    passwordHashed: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    isAdmin: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
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
    firstname: {
        type: DataTypes.STRING,
        unique: false,
        allowNull: false
    },
    lastname: {
        type: DataTypes.STRING,
        unique: false,
        allowNull: false
    },
    cellphone: {
        type: DataTypes.STRING,
        unique: false,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        unique: false,
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
},  
{
    sequelize,
    modelName: "Client",
    freezeTableName: true,
    indexes: [
        {
            unique: true,
            fields: ['firstname', 'lastname']
        }
    ]
});

ClientRatings.init({
    ratingid: {
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
    modelName: "ClientRatings",
    freezeTableName: true
});

Comment.init({
    commentid: {
        type: DataTypes.INTEGER,
        unique: true,
        primaryKey: true,
        autoIncrement: true
    },
    text: {
        type: DataTypes.TEXT,
        allowNull: false
    },
}, {
    sequelize,
    modelName: "ClientComments",
    freezeTableName: true
});

// creating password recovery table
Code.init({
    codeid: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true
    },
    code: {
        type: DataTypes.STRING,
        unique: true
    },
    coachID: {
        type: DataTypes.INTEGER,
    },
    used: {
        type: DataTypes.BOOLEAN
    },
    expiry: {
        type: DataTypes.DATE,
        allowNull: false
    },
}, {
    sequelize,
    modelName: "Reset_Codes"
});


// Establishing relationships
Coach.belongsToMany(Client, { through: 'CoachClient', foreignKey: 'CoachId', otherKey: 'ClientId'});
Client.belongsToMany(Coach, { through: 'CoachClient', foreignKey: 'ClientId', otherKey: 'CoachId'});

Coach.hasMany(Comment, { foreignKey: 'CoachId'});
Client.hasMany(Comment, { foreignKey: 'ClientId'});
Comment.belongsTo(Coach, { foreignKey: 'CoachId'});
Comment.belongsTo(Client, { foreignKey: 'ClientId'});

ClientRatings.belongsTo(Client, { foreignKey: 'ClientId' });
ClientRatings.belongsTo(Coach, { foreignKey: 'CoachId' });

Client.hasMany(ClientRatings, { foreignKey: 'ClientId' });
Coach.hasMany(ClientRatings, { foreignKey: 'CoachId' });

// initializeDatabase();

export { Coach, Client, ClientRatings, Comment, Code };