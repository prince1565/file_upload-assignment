const express = require('express');
const mongoose = require('mongoose');
const stockRoutes = require('./routes/stockRoutes');
const { connectDB } = require('./utils/db');
const app = express();

app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/stocks', stockRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
