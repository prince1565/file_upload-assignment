const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, file.originalname),
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'text/csv') cb(null, true);
  else cb(new Error('Please upload a CSV file'), false);
};

const csvUpload = multer({ storage, fileFilter });

module.exports = csvUpload;
