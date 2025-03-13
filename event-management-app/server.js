const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const eventRoutes = require('./routes/event'); 
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json()); // to parse JSON requests
app.use(cors());  // to enable cross-origin requests

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.log('MongoDB connection error: ', err));

// Use Routes
app.use('/api/events', eventRoutes); // Route for events
app.use('/api/auth', authRoutes);    // Route for authentication

// Handle uncaught errors gracefully
app.use((err, req, res, next) => {
    console.error(err.stack);  // Log the error stack
    res.status(500).json({ message: 'Something went wrong!' });
});

// Start the server only after successful MongoDB connection
mongoose.connection.once('open', () => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});

