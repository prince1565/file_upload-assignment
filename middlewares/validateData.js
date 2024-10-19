const validateRow = (row) => {
    const isValidDate = !isNaN(new Date(row.Date).getTime());
    const numericFields = [
      'Prev Close', 'Open', 'High', 'Low', 'Last', 'Close', 'VWAP', 
      'Volume', 'Turnover', 'Trades', 'Deliverable', '%Deliverable'
    ];
    
    const isValidNumbers = numericFields.every((field) => !isNaN(parseFloat(row[field])));
    
    return isValidDate && isValidNumbers;
  };
  
  module.exports = validateRow;
  