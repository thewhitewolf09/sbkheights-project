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

const User = mongoose.models.User || mongoose.model('User', UserSchema, 'users');

async function test() {
  const uri = process.env.MONGODB_URI;
  console.log("Connecting Mongoose to:", uri.split('@')[1]);
  
  await mongoose.connect(uri, { dbName: 'sbkheights' });
  console.log("Connected to:", mongoose.connection.db.databaseName);
  
  const count = await User.countDocuments({});
  console.log("User count via Mongoose:", count);
  
  const all = await User.find({});
  console.log("All users emails:", all.map(u => u.email));
  
  const target = 'admin@sbkheights.com';
  const found = await User.findOne({ email: target });
  console.log(`Searching for ${target}:`, found ? "Found" : "Not Found");
  
  if (found) {
     const passMatch = await bcrypt.compare('admin123', found.password);
     console.log("Password check 'admin123':", passMatch);
  }

  process.exit(0);
}

test();
