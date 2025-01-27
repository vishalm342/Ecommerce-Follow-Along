const multer = require('multer');

// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Define your upload folder
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + Math.round(Math.random() * 1e9);
    // Define a unique filename
    const filename = file.originalname.split(".")[0];
    // image.png take only image
    cb(null, filename + "-" + uniqueSuffix + ".png"); // Define
    // image-1624234567-123456789.png.
  }
});

// Initialize upload object
exports.upload = multer({ storage: storage });