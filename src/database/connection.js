require('dotenv').config();
const mongoose = require('mongoose');

const MONGODB_URL = process.env.MONGODB_URL;

const connectDataBase = async () => {
    try {
        await mongoose.connect(MONGODB_URL);
        console.log("Connected to DB:", mongoose.connection.name);
    } catch (error) {
        console.log('MongoDB connection error:', error);
        process.exit(1);
    }
    
}

module.exports = connectDataBase;

