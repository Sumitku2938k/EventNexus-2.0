const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json()); // for parsing application/json

app.get('/', (req, res) => {
  res.status(200).send('Welcome to EventNexus API');
});
app.get('/signup', (req, res) => {
    res.status(200).send('Signup page');
});

// Example route for events
app.get('/api/events', (req, res) => {
  res.status(200).json({ message: 'Events endpoint' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});

module.exports = app;
