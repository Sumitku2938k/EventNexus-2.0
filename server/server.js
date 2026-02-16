require('dotenv').config(); // Load environment variables from .env file

const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const router = require('./router/auth-router');
const eventRouter = require('./router/event-router');
const adminRouter = require('./router/admin-router');
const connectDB = require('./utils/db');
const fileUpload = require('express-fileupload');
const errorMiddleware = require('./middlewares/error-middleware');
const cors = require("cors");

//Handling cors policy issues
const corsOptions = {
    origin: "http://localhost:5173",
    methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
    credentials: true,
};
app.use(cors(corsOptions));

app.use(express.json()); // Middleware to parse JSON bodies
app.use(fileUpload({ // Enable file upload handling
  useTempFiles: true
}));

// Example routes
app.use('/api/auth', router); //Restful API for authentication and user management
app.use('/api/events', eventRouter); //Restful API for event management
app.use('/api/admin', adminRouter); //Restful API for admin dashboard and management

// Global error handling middleware
app.use(errorMiddleware);

// Start the server
connectDB().then(() => { // Ensure DB is connected before starting server
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}).catch((err) => {
  console.error('Failed to start server:', err);  
});
