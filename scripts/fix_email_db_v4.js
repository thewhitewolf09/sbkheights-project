
const mongoose = require('mongoose');

const MONGODB_URI = "mongodb+srv://sumitramprakashnirmal_db_user:Xe6HMEhqnqB1iR5d@sbkheights.trept1x.mongodb.net/sbkheights?retryWrites=true&w=majority&appName=sbkheights";

async function check() {
  console.log("Connecting to DB...");
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected Successfully to sbkheights DB");
    
    const db = mongoose.connection.db;
    const collection = db.collection('contents');
    const items = await collection.find({}).toArray();
    
    console.log(`Found ${items.length} content items`);
    
    let updatedCount = 0;
    for (const item of items) {
      const contentStr = JSON.stringify(item.content);
      if (contentStr.includes("shreebkinfratech@gmail.com")) {
        console.log(`MATCH FOUND: Page: ${item.page}, Section: ${item.section}`);
        // Let's replace it
        const newContent = JSON.parse(contentStr.replace(/shreebkinfratech@gmail\.com/g, "shreebk.infratech@gmail.com"));
        await collection.updateOne({ _id: item._id }, { $set: { content: newContent } });
        console.log("UPDATED");
        updatedCount++;
      }
    }

    // Also check 'enquiries' collection? Just in case.
    const enquiries = db.collection('enquiries');
    const enqItems = await enquiries.find({ email: "shreebkinfratech@gmail.com" }).toArray();
    if (enqItems.length > 0) {
      console.log(`Found ${enqItems.length} enquiries with incorrect email. Updating...`);
      await enquiries.updateMany({ email: "shreebkinfratech@gmail.com" }, { $set: { email: "shreebk.infratech@gmail.com" } });
      console.log("UPDATED ENQUIRIES");
    }

    console.log(`Email correction complete. Updated ${updatedCount} content items.`);
  } catch (err) {
    console.error("CONNECTION ERROR:", err);
  } finally {
    process.exit(0);
  }
}

check();
