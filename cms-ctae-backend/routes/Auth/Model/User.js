var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = new Schema({
    uId: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'user'
    },
    name: {
      type: String,
      default: ''
    },
    email: {
      type: String,
    },
    course: {
      type: String,
      default: 'B.Tech.'
    },
    whatsAppPhone: {
      type: String,
    },
    phone: {
      type: String
    },
    clubName: {
      type: String,
      default: 'Programming Club, CTAE'
    },
    clubPosition: {
      type: String,
      default: 'Member'
    },
});


module.exports = mongoose.model('User', User);