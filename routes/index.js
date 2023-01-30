const express = require('express');
const router = express.Router();
const path = require('path');

const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

router.get('/api', (req, res) => {
  res.status(200).json({ message: 'Hello from server!' });
});

router.post('/api/upload', upload.single('file'), (req, res) => {
  var contype = req.headers['content-type'];
  console.log('req.file: ', {
    contype,
    rawBody: req.rawBody,
  });
  res.status(200).json({ message: 'File uploaded!' });
});

router.use(express.static(path.join(__dirname, '../client/build')));

// All other GET requests not handled before will return our React app
router.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

module.exports = router;
