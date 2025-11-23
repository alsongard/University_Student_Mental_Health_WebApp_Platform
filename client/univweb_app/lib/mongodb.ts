// lib/mongodb.ts
import { MongoClient } from 'mongodb';
const MONGO_URI="mongodb+srv://alsongadizo_db_user:bFlfW3vkkkPDtHOZ@cluster0.df1h6dr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
// if (!process.env.MONGODB_URI) {
//     throw new Error('Please add your MongoDB URI to .env.local');
// }
// else
// {
//     console.log(`MONGOURI: ${process.env.MONGO_URI}`);
// }
const uri =MONGO_URI;
const options = {};

let client;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === 'development') 
{
    // In development, use global variable to preserve connection
    let globalWithMongo = global as typeof globalThis & {
        _mongoClientPromise?: Promise<MongoClient>;
    };

    if (!globalWithMongo._mongoClientPromise) {
        client = new MongoClient(uri, options);
        globalWithMongo._mongoClientPromise = client.connect();
    }
    clientPromise = globalWithMongo._mongoClientPromise;
    } else {
    // In production, create new connection
    client = new MongoClient(uri, options);
    clientPromise = client.connect();
}

export async function connectToDatabase() {
    const client = await clientPromise;
    const db = client.db(); // Your database name
    return { client, db };
}