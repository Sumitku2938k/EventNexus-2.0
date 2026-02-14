const Event = require('../models/event-model');

const getAllEvents = async (req, res) => {
    try {
        const events = await Event.find();
        console.log("All Events Data: ", events);

        if(!events || events.length === 0){
            return res.status(404).json({ message: 'No events found' });
        }

        return res.status(200).json({ events });
    } catch (error) {
        console.error('Error in fetching all events:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = { getAllEvents };