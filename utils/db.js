const mongoose = require('mongoose');

exports.connectDB = () => {
  mongoose.connect('mongodb://localhost:27017/stock_data', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));
};
