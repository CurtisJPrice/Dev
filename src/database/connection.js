require('dotenv').config();
const mongoose = require('mongoose');

const MONGO_URI = process.env.MONGO_URI;

const connectDataBase = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("Connected to DB:", mongoose.connection.name);
    } catch (error) {
        console.log('MongoDB connection error:', error);
        process.exit(1);
    }
    
}

module.exports = connectDataBase;

