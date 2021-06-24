var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const mongoose = require("mongoose");
const config = require("./config");
const MongoDBURL = config.MONGODB_URL;

// DB Connection
const mongoConnect = mongoose.connect(MongoDBURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoConnect.then(
  (db) => console.log("Connected to MongoDB..."),
  (err) => console.log(err)
);

var authRouter = require("./routes/Auth/auth");
var clubRouter = require("./routes/Club/club");
var clubEventRouter = require("./routes/Club/Event/event");
var clubPostRouter = require("./routes/Club/Post/post");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/auth", authRouter);
app.use("/admin/club", clubRouter);
app.use("/club/event", clubEventRouter);
app.use("/club/post", clubPostRouter);

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
