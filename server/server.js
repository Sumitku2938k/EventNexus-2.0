require('dotenv').config(); // Load environment variables from .env file

const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const router = require('./router/auth-router');
const eventRouter = require('./router/event-router');
const connectDB = require('./utils/db');

app.use(express.json()); // for parsing application/json

// Example routes
app.use('/api/auth', router); //Restful API for authentication and user management
app.use('/api/events', eventRouter); //Restful API for event management

// Start the server
connectDB().then(() => { // Ensure DB is connected before starting server
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}).catch((err) => {
  console.error('Failed to start server:', err);  
});
