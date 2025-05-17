require('dotenv').config();
const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI;

const connectDataBase = async () => {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log("Connected to DB:", mongoose.connection.name);
    } catch (error) {
        console.log('MongoDB connection error:', error);
        process.exit(1);
    }
    
}

module.exports = connectDataBase;

