var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

const { GridFsStorage } = require("multer-gridfs-storage");


const mongoose = require("mongoose");
const config = require("./config");
const MongoDBURL = config.MONGODB_URL;
// const Grid = require("gridfs-stream");

// DB Connection
const mongoConnect = mongoose.connect(MongoDBURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: true,
});

// // Init gfs
// let gfs;

mongoConnect.then(
  (db) => {
    console.log("Connected to MongoDB...");
    // gfs = Grid(db, mongoose.mongo);
    // gfs.collection("uploads");
    mongoose.storage = new GridFsStorage({ db: mongoConnect });
  },
  (err) => console.log(err)
);

var authRouter = require("./routes/Auth/auth");
var clubRouter = require("./routes/Club/club");
var clubEventRouter = require("./routes/Club/Event/event");
var clubPostRouter = require("./routes/Club/Post/post");
var imageRouter = require("./routes/Image/image");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// Body-parser middleware

app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(function (req, res, next) {
  console.log(`REQUEST [${req.url}] {${req.path}}: `);
  console.log(req.body);
  next();
});

app.use("/auth", authRouter);
app.use("/admin/club", clubRouter);
app.use("/club/event", clubEventRouter);
app.use("/club/post", clubPostRouter);
app.use("/upload/images", imageRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
