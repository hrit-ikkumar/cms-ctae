var express = require("express");
var router = express.Router();
const path = require("path");

const crypto = require("crypto");
const mongoose = require("mongoose");
const MongoUrl = require("../../config").MONGODB_URL;
const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");
var Grid = require("gridfs-stream");

let gfs;

mongoose.connection.once("open", () => {
  // Init stream
  gfs = Grid(mongoose.connection.db, mongoose.mongo);
  gfs.collection("uploads");
});

// Create storage engine
const storage = new GridFsStorage({
  url: MongoUrl,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString("hex") + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: "uploads",
        };
        resolve(fileInfo);
      });
    });
  },
});

const upload = multer({ storage });

router.post("/", upload.single("file"), (req, res, next) => {
  const { file } = req;
  console.log(file);
  res.statusCode = 200;
  res.send();
  return;
});

module.exports = router;
