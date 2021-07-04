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
  clubLogo: {
    type: String,
    required: true,
  },
  clubBanner: {
    type: String,
  },
  clubPhotos: {
    type: Array,
    required: false,
  },
  clubDescription: {
    type: String,
    required: false
  },
  socialMedia: {
    type: Object,
    required: false
  },
  clubMembers:{
    type: Array,
    required: false
  }
});

module.exports = mongoose.model("Club", Club);
