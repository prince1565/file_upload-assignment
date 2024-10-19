const express = require('express');
const { uploadCSV, getHighestVolume, getAverageClose, getAverageVWAP } = require('../controllers/stockController');
const csvUpload = require('../middlewares/csvUpload');
const router = express.Router();

// CSV Upload route
router.post('/upload', csvUpload.single('file'), uploadCSV);

// Data retrieval routes
router.get('/highest_volume', getHighestVolume);
router.get('/average_close', getAverageClose);
router.get('/average_vwap', getAverageVWAP);

module.exports = router;
