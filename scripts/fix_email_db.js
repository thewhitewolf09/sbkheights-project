
const mongoose = require('mongoose');

const MONGODB_URI = "mongodb+srv://sumitramprakashnirmal_db_user:Xe6HMEhqnqB1iR5d@sbkheights.trept1x.mongodb.net/?retryWrites=true&w=majority&appName=sbkheights";

const ContentSchema = new mongoose.Schema({
  page: String,
  section: String,
  content: Object
}, { timestamps: true });

const Content = mongoose.models.Content || mongoose.model('Content', ContentSchema);

async function check() {
  await mongoose.connect(MONGODB_URI);
  console.log("Connected to DB");
  
  const item = await Content.findOne({ page: "contact", section: "main" });
  if (item) {
    console.log("FOUND CONTACT MAIN:", JSON.stringify(item.content, null, 2));
    if (item.content.details && item.content.details.email) {
      if (item.content.details.email !== "shreebk.infratech@gmail.com") {
        console.log("UPDATING EMAIL TO shreebk.infratech@gmail.com");
        item.content.details.email = "shreebk.infratech@gmail.com";
        item.markModified('content');
        await item.save();
        console.log("UPDATED SUCCESSFULLY");
      } else {
        console.log("EMAIL IS ALREADY CORRECT IN DB");
      }
    }
  } else {
    console.log("CONTACT MAIN NOT FOUND IN DB");
  }

  // Also check governance email in legal/all
  const legal = await Content.findOne({ page: "legal", section: "all" });
  if (legal) {
    console.log("FOUND LEGAL ALL:", JSON.stringify(legal.content, null, 2));
    if (legal.content.governance && legal.content.governance.email) {
       if (legal.content.governance.email !== "shreebk.infratech@gmail.com") {
          console.log("UPDATING GOVERNANCE EMAIL to shreebk.infratech@gmail.com");
          legal.content.governance.email = "shreebk.infratech@gmail.com";
          legal.markModified('content');
          await legal.save();
          console.log("UPDATED GOVERNANCE SUCCESSFULLY");
       }
    }
  }

  process.exit(0);
}

check().catch(err => {
  console.error(err);
  process.exit(1);
});
