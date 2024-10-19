const fs = require('fs');
const csv = require('csv-parser');
const validateRow = require('../middlewares/validateData');

const csvParser = (filePath, results, failedRecords) => {
  return new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (row) => {
        if (validateRow(row)) results.push(row);
        else failedRecords.push({ row, reason: 'Validation failed' });
      })
      .on('end', resolve)
      .on('error', reject);
  });
};

module.exports = csvParser;
