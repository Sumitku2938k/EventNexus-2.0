const Event = require('../models/event-model');
const cloudinary = require('cloudinary').v2;

// Configuration
cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.API_KEY, 
    api_secret: process.env.API_SECRET // Click 'View API Keys' above to copy your API secret
});

const createEvent = async (req, res) => {
    try {
        const { name, description, date, venue, registrationFee, category, poster } = req.body;

        // basic validation
        if (!name || !description || !date || !venue || !category) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const file = req.files.poster;
        cloudinary.uploader.upload(file.tempFilePath, async (error, result) => {
            console.log("Result: ", result);
            const event = new Event({
                name,
                description,
                date,
                venue,
                registrationFee,
                category,
                poster: result.secure_url,
                createdBy: req.user._id // secure
            });
            await event.save(); // Save the event to the database
            res.status(201).json({ message: 'Event created successfully', event});
            console.log("Event created: ", event);
        })
    } catch (error) {
        console.error('Error in events controller:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = { createEvent };
