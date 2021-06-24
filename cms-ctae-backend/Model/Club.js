var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Club = new Schema({
  clubName: {
    type: String,
    required: true,
  },
  clubCode: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Club", Club);
