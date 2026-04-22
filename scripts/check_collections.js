
const mongoose = require('mongoose');

const MONGODB_URI = "mongodb+srv://sumitramprakashnirmal_db_user:Xe6HMEhqnqB1iR5d@sbkheights.trept1x.mongodb.net/?retryWrites=true&w=majority&appName=sbkheights";

async function check() {
  console.log("Connecting to DB...");
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected Successfully");
    
    const db = mongoose.connection.db;
    const collections = await db.listCollections().toArray();
    console.log("Collections:", collections.map(c => c.name));
    
    // Most likely it's 'contents' (plural) or 'Contents'
    // Let's try pluralizing manually if it's different.
  } catch (err) {
    console.error("CONNECTION ERROR:", err);
  } finally {
    process.exit(0);
  }
}

check();
