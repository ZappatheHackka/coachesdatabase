import connect from './src/models/db-connect.js'; // or wherever your Sequelize instance is
import { Coach } from './src/models/models.js'; // or your User model
import bcrypt from 'bcrypt';
import dotenv from "dotenv";

dotenv.config();

const email = process.env.SEED_EMAIL
const password = process.env.SEED_PASS 

async function seedUser() {
  try {
    await connect.sync(); // ensures tables exist
    const existing = await Coach.findOne({ where: { email } });

    if (!existing) {
      const hash = bcrypt.hash(password, 10);
      await Coach.create({ email, passwordHashed: hash, isAdmin: true, firstname: "Chris", lastname: "Cottone", });
      console.log(`✅ Seeded user: ${email} / ${password}`);
    } else {
      console.log('ℹ️ Seed user already exists');
    }

    process.exit(0);
  } catch (err) {
    console.error('❌ Seeding failed:', err);
    process.exit(1);
  }
}

seedUser();
