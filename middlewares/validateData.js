const validateRow = (row) => {
  const isValidDate = !isNaN(new Date(row.Date).getTime());
  const numericFields = [
    'Prev Close', 'Open', 'High', 'Low', 'Last', 'Close', 'VWAP', 
    'Volume', 'Turnover', 'Trades', 'Deliverable', '%Deliverable'
  ];

  const invalidReasons = [];

  if (!isValidDate) {
    invalidReasons.push('Invalid Date');
  }

  numericFields.forEach((field) => {
    if (isNaN(parseFloat(row[field]))) {
      invalidReasons.push(`Invalid number in field: ${field}`);
    }
  });

  return invalidReasons.length === 0 ? { isValid: true } : { isValid: false, reasons: invalidReasons };
};

const processCSVData = (data) => {
  let successCount = 0;
  let failureCount = 0;
  const failedRecords = [];

  data.forEach((row) => {
    const validationResult = validateRow(row);

    if (validationResult.isValid) {
      successCount++;
    } else {
      failureCount++; 
      failedRecords.push({
        row,
        reasons: validationResult.reasons
      });
    }
  });

  // Returning a JSON response
  return {
    totalRecords: data.length,
    successCount,
    failureCount,
    failedRecords
  };
};

module.exports = { validateRow, processCSVData };
