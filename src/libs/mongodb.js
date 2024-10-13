import { MongoClient } from 'mongodb';

const uri = import.meta.env.MONGODB_URI;
let mongoClient;
let mongoDb;

export async function connectToMongo() {
    if (!mongoClient) {
        mongoClient = new MongoClient(uri);
        await mongoClient.connect();
        mongoDb = mongoClient.db('LevelUp');
        console.log('Connected to MongoDB');
    }

    if (!mongoDb) {
        throw new Error('MongoDB connection has not been established');
    }
    return { client: mongoClient, db: mongoDb };
}
