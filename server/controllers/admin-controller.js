const createEvent = async (req, res) => {
    try {
        res.status(200).json({ message: 'Events created successfully' });
    } catch (error) {
        console.error('Error in events controller:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = { createEvent };