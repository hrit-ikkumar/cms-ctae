const mongoose = require("mongoose");
let Schema = mongoose.Schema;

let Post = new Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  authorTitle: {
    type: String,
    required: true,
  },
  dateTime: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    default: "",
  },
  imageLink: {
    type: String,
    default: "",
  }
});

module.exports = {
  SimplePost: mongoose.model("Post", Post),
  ClubWisePost: (clubCode) => mongoose.model("Post_" + clubCode, Post),
};
