import mongoose from 'mongoose';
import dns from 'dns';

// Force Node to use reliable DNS for SRV lookups (bypasses failing local DNS)
if (typeof window === 'undefined') {
  try {
    dns.setServers(['8.8.8.8', '1.1.1.1']);
  } catch (e) {
    console.warn("Could not set custom DNS servers", e);
  }
}

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/sbkheights';

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

async function connectToDatabase(retryCount = 0) {
  if (cached.conn) {
    if (cached.conn.connection.db?.databaseName === 'test') {
      await mongoose.disconnect();
      cached.conn = null;
      cached.promise = null;
    } else {
      return cached.conn;
    }
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: true, 
      dbName: 'sbkheights',
      serverSelectionTimeoutMS: 10000,
      family: 4, // Force IPv4 resolution
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    }).catch(async (err) => {
      cached.promise = null;
      if (retryCount < 2) {
        console.warn(`[DB] Connection attempt ${retryCount + 1} failed. Retrying...`, err.message);
        await new Promise(resolve => setTimeout(resolve, 2000));
        return connectToDatabase(retryCount + 1);
      }
      throw err;
    });
  }
  
  try {
    cached.conn = await cached.promise;
  } catch (e: any) {
    cached.promise = null;
    throw new Error(e.message || "Database connection failed");
  }
  
  return cached.conn;
}

export default connectToDatabase;
