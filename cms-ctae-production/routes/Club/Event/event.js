var express = require("express");
var router = express.Router();
const Event = require("../../../Model/Event"); // mongoose.model('User');
const { SimpleEvent, ClubWiseEvent } = Event;
const Club = require("../../../Model/Club");

// GET ALL THE EVENTS OF A CLUB
router.post("/getEvents", (req, res, next) => {
  let { clubName } = req.body;

  Club.findOne({ clubName: clubName })
    .then((result) => {
      if (result != null) {
        let CurrentClubEvent = ClubWiseEvent(result.clubCode);
        CurrentClubEvent.find({})
          .then((value) => {
            if (value != null) {
              res.statusCode = 200;

              res.send(value);
              return;
            } else {
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
  const {
    title,
    meetUrl,
    dateTime,
    description,
    poster,
    clubName,
    participants,
  } = req.body;

  Club.findOne({ clubName: clubName })
    .then((result) => {
      if (result != null) {
        let CurrentClubEvent = ClubWiseEvent(result.clubCode);
        let newEventData = {
          title,
          meetUrl,
          dateTime,
          description,
          poster,
          participants,
        };
        let newEvent = new CurrentClubEvent(newEventData);
        newEvent
          .save()
          .then((value) => {
            if (value != null) {
              res.statusCode = 200;
              res.send(value);
              return;
            } else {
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

// UPDATE A EVENT IN CLUB
router.put("/update", (req, res, next) => {
  const { title, meetUrl, dateTime, description, poster, clubName, prevData } =
    req.body;

  Club.findOne({ clubName: clubName })
    .then((result) => {
      if (result != null) {
        let CurrentClubEvent = ClubWiseEvent(result.clubCode);
        let newEventData = {
          ...prevData,
          title,
          meetUrl,
          dateTime,
          description,
          poster,
        };
        CurrentClubEvent.findOneAndUpdate(prevData, newEventData, {
          new: false,
          useFindAndModify: true,
        })
          .then((result) => {
            if (result === null) {
              throw error;
            } else {
              res.statusCode = 200;
              res.send(newEventData);
              return;
            }
          })
          .catch((err) => {
            if (err != null) {
              {
                res.statusCode = 406; // NOT_ACCEPTABLE ERRORS
                res.send();
                return;
              }
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

// DELETE A NEW EVENT IN CLUB
router.delete("/delete", (req, res, next) => {
  const {
    _id,
    title,
    meetUrl,
    dateTime,
    description,
    poster,
    participants,
    clubName,
  } = req.body;

  const eventData = {
    _id,
    title,
    meetUrl,
    dateTime,
    description,
    poster,
    participants,
    clubName,
  };

  Club.findOne({ clubName: eventData.clubName })
    .then((result) => {
      if (result != null) {
        let CurrentClubEvent = ClubWiseEvent(result.clubCode);

        CurrentClubEvent.findOneAndDelete(
          {
            _id: _id,
            title: title,
            meetUrl,
            dateTime,
            description: description,
            dateTime: dateTime,
            poster: poster,
          },
          { useFindAndModify: true }
        )
          .then((result) => {
            console.log(result);
            if (result === null) {
              res.statusCode = 406;
              res.send(false);
              return;
            } else {
              console.log("TRUE");
              res.statusCode = 200;
              res.send(true);
              return;
            }
          })
          .catch((err) => {
            if (err != null) {
              {
                res.statusCode = 406; // NOT_ACCEPTABLE ERRORS
                res.send(false);
                return;
              }
            }
          });
      } else {
        res.statusCode = 406;
        res.send(false);
        return;
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

// Participate IN A EVENT IN CLUB
router.post("/participate", (req, res, next) => {
  const { userDetails, clubName, title, _id } = req.body;

  Club.findOne({ clubName: clubName })
    .then((result) => {
      if (result != null) {
        let newParticipant = {
          ...userDetails,
        };
        let CurrentClubEvent = ClubWiseEvent(result.clubCode);
        CurrentClubEvent.updateOne(
          { _id: _id, title: title },
          { $push: { participants: newParticipant } },
          { useFindAndModify: true }
        )
          .then((result) => {
            if (result === null) {
              res.statusCode = 406;
              res.send();
              return;
            } else {
              res.statusCode = 200;
              res.send();
              return;
            }
          })
          .catch((err) => {
            if (err != null) {
              res.statusCode = 406;
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
