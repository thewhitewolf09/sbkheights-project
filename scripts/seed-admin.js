const bcrypt = require('bcryptjs');
const { MongoClient } = require('mongodb');
require('dotenv').config({ path: '.env.local' });

async function seed() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error("ERROR: MONGODB_URI not found in .env.local");
    process.exit(1);
  }
  
  const client = new MongoClient(uri);
  try {
    await client.connect();
    // Seed sbkheights
    const dbSBK = client.db('sbkheights');
    const usersSBK = dbSBK.collection('users');
    const hashedPassword = await bcrypt.hash('admin123', 10);
    await usersSBK.updateOne(
      { email: 'admin@sbkheights.com' },
      { $set: { name: 'Super Admin', email: 'admin@sbkheights.com', password: hashedPassword, role: 'admin', createdAt: new Date() } },
      { upsert: true }
    );

    // Seed test (as fallback)
    const dbTest = client.db('test');
    const usersTest = dbTest.collection('users');
    await usersTest.updateOne(
      { email: 'admin@sbkheights.com' },
      { $set: { name: 'Super Admin', email: 'admin@sbkheights.com', password: hashedPassword, role: 'admin', createdAt: new Date() } },
      { upsert: true }
    );
    
    console.log("-----------------------------------------");
    console.log("SUCCESS: Admin user seeded in [sbkheights] and [test].");
    console.log("EMAIL: admin@sbkheights.com");
    console.log("PASS:  admin123");
    console.log("-----------------------------------------");
  } catch (err) {
    console.error("Seeding failed:", err);
  } finally {
    await client.close();
  }
}

seed();
