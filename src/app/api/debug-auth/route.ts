import { NextResponse } from "next/server";
import { User } from "@/models/User";
import connectToDatabase from "@/lib/db";
import bcrypt from "bcryptjs";

export async function GET() {
  await connectToDatabase();
  const testEmail = 'admin@sbkheights.com';
  const user = await User.findOne({ email: testEmail });
  const allUsers = await User.find({});
  const dbName = (await connectToDatabase()).connection.db.databaseName;
  const collections = await (await connectToDatabase()).connection.db.listCollections().toArray();
  
  return NextResponse.json({
    emailSearch: testEmail,
    userFound: !!user,
    allUsers: allUsers.map((u: any) => ({ email: u.email })),
    dbName,
    collections: collections.map((c: any) => c.name),
    dbConnection: true,
    env: {
       hasUri: !!process.env.MONGODB_URI,
       uriPrefix: process.env.MONGODB_URI?.split('@')[1] // Hide credentials
    }
  });
}
