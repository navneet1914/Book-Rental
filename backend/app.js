const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const searchRoutes = require('./routes/searchRoutes');
const connectDB = require('./config/db');

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/v1', searchRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
