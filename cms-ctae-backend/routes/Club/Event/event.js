var express = require("express");
var router = express.Router();
const Event = require("../../../Model/Event"); // mongoose.model('User');
const { SimpleEvent, ClubWiseEvent } = Event;
const Club = require("../../../Model/Club");

// GET ALL THE EVENTS OF A CLUB
router.post('/getEvents', (req, res, next) => {
  let {clubName} = req.body;
  if(clubName == null) {
    clubName = "Programming Club, CTAE"
  }
  console.log(req.body);
  Club.findOne({ clubName: clubName })
    .then((result) => {
      if (result != null) {
        let CurrentClubEvent = ClubWiseEvent(result.clubCode);
        CurrentClubEvent.find({})
        .then((value) => {
          if(value != null) {
            res.statusCode = 200;
            console.log(value);
            res.send(value);
            return;
          }
          else
          {
            throw error;
          }
        })
        .catch((err) => {
          if (err != null) {
            res.statusCode = 500;
            res.send();
            return;
          }
        });
      }
    })
    .catch((err) => {
      if (err != null) {
        res.statusCode = 500;
        res.send();
        return;
      }
    });
});

// CREATE A NEW EVENT IN CLUB
router.post("/create", (req, res, next) => {
  const { title, meetUrl, dateTime, description, poster, clubName } = req.body;
  console.log(req.body);
  Club.findOne({ clubName: clubName })
    .then((result) => {
      if (result != null) {
        let CurrentClubEvent = ClubWiseEvent(result.clubCode);
        let newEventData = {title, meetUrl, dateTime, description, poster};
        let newEvent = new CurrentClubEvent(newEventData);
        newEvent
        .save()
        .then((value) => {
          if(value != null) {
            res.statusCode = 200;
            res.send(value);
            return;
          }
          else
          {
            throw error;
          }
        })
        .catch((err) => {
          if (err != null) {
            res.statusCode = 500;
            res.send();
            return;
          }
        });
      }
    })
    .catch((err) => {
      if (err != null) {
        res.statusCode = 500;
        res.send();
        return;
      }
    });
});

module.exports = router;
