var express = require('express');
var router = express.Router();

const multer  = require('multer');
const {GridFsStorage} = require('multer-gridfs-storage');
const url = require('../../config').MONGODB_URL;

// Create a storage object with a given configuration
const storage = new GridFsStorage({ url });

// Set multer storage engine to the newly created object
const upload = multer({ storage });


router.post('/', (req, res, next) => {
  const {name, file} = req.body;
  upload.single(na)

});

module.exports = router;