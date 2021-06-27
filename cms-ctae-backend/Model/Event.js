var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Event = new Schema({
  title: {
    type: String,
    required: true,
  },
  meetUrl: {
    type: String,
    required: true,
  },
  dateTime: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  poster: {
    type: String,
    required: true,
  },
  participants: {
    type: Array,
    required: true
  }
});

module.exports = {
  SimpleEvent: mongoose.model("Event", Event),
  ClubWiseEvent: (clubCode) => {
    return mongoose.model("Event_" + clubCode, Event);
  },
};
