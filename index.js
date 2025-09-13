// --- Dependencies ---
const express = require('express');
const { MongoClient } = require('mongodb');
require('dotenv').config();

// --- Configuration ---
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

// --- Main App ---
const app = express();
let db;

// --- Database Connection Function ---
async function connectToDB() {
    if (!MONGO_URI) {
        console.error("FATAL ERROR: MONGO_URI is not defined.");
        process.exit(1);
    }
    try {
        const client = new MongoClient(MONGO_URI);
        await client.connect();
        db = client.db("yourDB"); // Use your DB name here
        console.log('✅ Successfully connected to MongoDB.');
    } catch (error) {
        console.error('❌ Failed to connect to MongoDB', error);
        process.exit(1);
    }
}

// --- Start Server Function ---
async function startServer() {
    await connectToDB();

    app.get('/', (req, res) => {
        res.status(200).send('Hello! The Bookkeeping Bot server is running.');
    });

    app.listen(PORT, () => {
        console.log(`🚀 Server is listening on port ${PORT}`);
    });
}

startServer();
