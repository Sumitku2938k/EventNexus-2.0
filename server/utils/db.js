const mongoose = require('mongoose');

const dbURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/EventNexus';

const connectDB = async () => {
    try {
        await mongoose.connect(dbURI);
        console.log('Connected to MongoDB successfully');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(0);
    }
};
module.exports = connectDB;
