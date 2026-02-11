const User = require('../models/user-model');

const home = async (req, res) => {
    try {
        res.status(200).json({ message: 'Home endpoint' });
    } catch (error) {
        console.error('Error in home controller:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const register = async (req, res) => {
    try {
        const { name, email, password } = req.body; // Extract user details from request body
        const userExist = await User.findOne({ email }); // Check if user already exists
        if (userExist) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const userCreated = await User.create({ name, email, password });
        res.status(200).json({ message: 'User created successfully', user: userCreated });
    } catch (error) {
        console.error('Error in register controller:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const events = async (req, res) => {
    try {
        res.status(200).json({ message: 'Events endpoint' });
    } catch (error) {
        console.error('Error in events controller:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};


module.exports = { home, register, events };