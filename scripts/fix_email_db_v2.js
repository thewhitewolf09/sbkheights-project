
const mongoose = require('mongoose');

const MONGODB_URI = "mongodb+srv://sumitramprakashnirmal_db_user:Xe6HMEhqnqB1iR5d@sbkheights.trept1x.mongodb.net/?retryWrites=true&w=majority&appName=sbkheights";

async function check() {
  console.log("Connecting to DB...");
  try {
    await mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("Connected Successfully");
    
    const db = mongoose.connection.db;
    const collection = db.collection('contents');
    const items = await collection.find({}).toArray();
    
    console.log(`Found ${items.length} content items`);
    
    for (const item of items) {
      const contentStr = JSON.stringify(item.content);
      if (contentStr.includes("shreebkinfratech@gmail.com")) {
        console.log(`MATCH FOUND: Page: ${item.page}, Section: ${item.section}`);
        // Let's replace it
        const newContent = JSON.parse(contentStr.replace(/shreebkinfratech@gmail\.com/g, "shreebk.infratech@gmail.com"));
        await collection.updateOne({ _id: item._id }, { $set: { content: newContent } });
        console.log("UPDATED");
      }
    }
  } catch (err) {
    console.error("CONNECTION ERROR:", err);
  } finally {
    process.exit(0);
  }
}

check();
