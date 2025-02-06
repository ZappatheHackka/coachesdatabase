import sequelize from "./db-connect.js";
import initializeDatabase from "./db-sync.js";
import { Coach, Client, Stats } from "./models.js";

// Testing creating new coach
async function addCoach() {
    try {
        const newCoach = await Coach.create({
            firstname: "Michael",
            lastname: "Jackson"
        });
        console.log("Coach added:", newCoach);
    } catch (error) {
        console.log("Error:", error);
    }
}

async function addClient() {
    try {
        const newClient = await Client.create({
            name: "John PearDeath",
            cellphone: "12345678",
            email: "milk@gmail.com",
            age: "476",
            parent: "Justinian",
        });
        console.log("Created new Client:", newClient);    
    }
    catch (error) {
        console.log("Error!:", error);
    }
}

async function giveRating() {
    try {
        const newRating = Stats.create({
            ball_handling: "1",
            finishing: "3",
            shooting: "0",
            iq: "134",
            defense: "2",
            passing: "89"
        });
        console.log("Ratings given", newRating);
    }
    catch (error) {
        console.log("Error", error);
    }
}

addCoach();
addClient();
giveRating();
initializeDatabase();