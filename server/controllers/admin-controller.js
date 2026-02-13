const Event = require('../models/event-model');

const createEvent = async (req, res) => {
    try {
        const { name, description, date, venue, registrationFee, category, poster, maxParticipants } = req.body;

        // basic validation
        if (!name || !description || !date || !venue || !category) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        if (maxParticipants && maxParticipants < 1) {
            return res.status(400).json({ message: "Invalid maxParticipants" });
        }


        const event = new Event({
            name,
            description,
            date,
            venue,
            registrationFee,
            category,
            poster,
            maxParticipants,
            createdBy: req.user._id // secure
        });

        await event.save(); // Save the event to the database

        res.status(201).json({
            message: 'Event created successfully',
            event
        });

    } catch (error) {
        console.error('Error in events controller:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = { createEvent };
