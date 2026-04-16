const { MongoClient } = require('mongodb');
require('dotenv').config({ path: '.env.local' });

async function checkAll() {
  const uri = process.env.MONGODB_URI;
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const admin = client.db().admin();
    const dbs = await admin.listDatabases();
    console.log("Databases found:", dbs.databases.map(d => d.name));
    
    for (const dbInfo of dbs.databases) {
      if (['admin', 'local', 'config'].includes(dbInfo.name)) continue;
      const db = client.db(dbInfo.name);
      const collections = await db.listCollections().toArray();
      for (const col of collections) {
         if (col.name === 'users') {
            const count = await db.collection('users').countDocuments();
            console.log(`DB [${dbInfo.name}] Collection [users] has ${count} users.`);
            if (count > 0) {
               const sample = await db.collection('users').findOne({});
               console.log(`Sample user email: ${sample.email}`);
            }
         }
      }
    }
  } catch (err) {
    console.error("Check failed:", err);
  } finally {
    await client.close();
  }
}

checkAll();
