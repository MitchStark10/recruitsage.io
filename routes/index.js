const express = require('express');
const router = express.Router();
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log('in destination');
    cb(null, './storage');
  },
  filename: (req, file, cb) => {
    console.log('in filename');
    const fileName = file.originalname.toLowerCase().split(' ').join('-');
    cb(null, uuidv4() + '-' + fileName)
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    console.log("in file filter");
    if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
    }
  },
  onError: (err, next) => {
    console.log('error: ', err);
    next(err);
  }
});

router.get('/api', (req, res) => {
  res.status(200).json({ message: 'Hello from server!' });
});

router.post('/api/upload', upload.single('upload'), (req, res) => {
  console.log('Receieved file: ', req.file);
  res.status(200).json({ message: 'File uploaded!' });
});

router.use(express.static(path.join(__dirname, '../client/build')));

// All other GET requests not handled before will return our React app
router.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

module.exports = router;
