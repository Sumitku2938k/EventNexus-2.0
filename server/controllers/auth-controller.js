const home = async (req, res) => {
    try {
        res.status(200).send('Welcome to EventNexus API');
    } catch (error) {
        console.error('Error in home controller:', error);
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


module.exports = { home, events };