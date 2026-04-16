const { MongoClient } = require('mongodb');
require('dotenv').config({ path: '.env.local' });

async function verify() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error("ERROR: MONGODB_URI not found");
    process.exit(1);
  }
  
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db('sbkheights');
    const collections = await db.listCollections().toArray();
    console.log("Collections in sbkheights:", collections.map(c => c.name));
    
    const users = await db.collection('users').find({}).toArray();
    console.log("Users found in sbkheights.users:", users.map(u => ({ email: u.email, role: u.role, hasPassword: !!u.password })));
  } catch (err) {
    console.error("Verification failed:", err);
  } finally {
    await client.close();
  }
}

verify();
