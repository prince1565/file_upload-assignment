const Stock = require('../models/stockModel');
const csvParser = require('../utils/csvParser');

// Upload and validate CSV
exports.uploadCSV = async (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'No file uploaded' });
  const results = [];
  const failedRecords = [];
  
  await csvParser(req.file.path, results, failedRecords);

  await Stock.insertMany(results);  // Save validated data to MongoDB
  
  return res.json({
    total: results.length + failedRecords.length,
    success: results.length,
    failed: failedRecords.length,
    failedRecords,
  });
};

// Get stock record with highest volume
exports.getHighestVolume = async (req, res) => {
  const { start_date, end_date, symbol } = req.query;
  const filter = {
    date: { $gte: start_date, $lte: end_date },
    ...(symbol && { symbol }),
  };

  const highestVolume = await Stock.find(filter).sort({ volume: -1 }).limit(1);
  res.json(highestVolume[0] || { message: 'No records found' });
};

// Calculate average close price
exports.getAverageClose = async (req, res) => {
  const { start_date, end_date, symbol } = req.query;
  const filter = { date: { $gte: start_date, $lte: end_date }, symbol };

  const avgClose = await Stock.aggregate([
    { $match: filter },
    { $group: { _id: null, average_close: { $avg: '$close' } } },
  ]);

  res.json({ average_close: avgClose[0]?.average_close || 0 });
};

// Calculate average VWAP
exports.getAverageVWAP = async (req, res) => {
  const { start_date, end_date, symbol } = req.query;
  const filter = { date: { $gte: start_date, $lte: end_date }, ...(symbol && { symbol }) };

  const avgVWAP = await Stock.aggregate([
    { $match: filter },
    { $group: { _id: null, average_vwap: { $avg: '$vwap' } } },
  ]);

  res.json({ average_vwap: avgVWAP[0]?.average_vwap || 0 });
};
