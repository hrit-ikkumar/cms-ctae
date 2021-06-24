var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var User = new Schema({
  uId: {
    type: String,
    default: "",
  },
  type: {
    type: String,
    default: "user",
  },
  name: {
    type: String,
    default: "",
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  course: {
    type: String,
    default: "B.Tech.",
  },
  whatsAppPhone: {
    type: String,
  },
  phone: {
    type: String,
  },
  clubName: {
    type: String,
    default: "Programming Club, CTAE",
  },
  clubPosition: {
    type: String,
    default: "Member",
  },
});

module.exports = {
  SimpleUser: mongoose.model("User", User),
  ClubWiseUser: (clubCode) => {
    return mongoose.model("User_" + clubCode, User);
  },
};
