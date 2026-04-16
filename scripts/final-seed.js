const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config({ path: '.env.local' });

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'admin' },
  createdAt: { type: Date, default: Date.now }
});

async function seed() {
  const uri = process.env.MONGODB_URI;
  console.log("Seeding with Mongoose to:", uri.split('@')[1]);
  
  // Seed sbkheights
  await mongoose.connect(uri, { dbName: 'sbkheights' });
  const UserSBK = mongoose.model('UserSBK', UserSchema, 'users');
  const hashed = await bcrypt.hash('admin123', 10);
  await UserSBK.updateOne(
    { email: 'admin@sbkheights.com' },
    { $set: { name: 'Super Admin', email: 'admin@sbkheights.com', password: hashed, role: 'admin' } },
    { upsert: true }
  );
  console.log("Seeded sbkheights.users");
  await mongoose.disconnect();

  // Seed test
  await mongoose.connect(uri, { dbName: 'test' });
  const UserTest = mongoose.model('UserTest', UserSchema, 'users');
  await UserTest.updateOne(
    { email: 'admin@sbkheights.com' },
    { $set: { name: 'Super Admin', email: 'admin@sbkheights.com', password: hashed, role: 'admin' } },
    { upsert: true }
  );
  console.log("Seeded test.users");
  await mongoose.disconnect();
  
  console.log("Dual Seeding Complete.");
  process.exit(0);
}

seed();
