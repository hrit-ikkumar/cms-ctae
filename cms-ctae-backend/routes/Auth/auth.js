var express = require("express");
var router = express.Router();
const User = require("../../Model/User"); // mongoose.model('User');
const Club = require("../../Model/Club"); // mongoose.model('Club')
const { SimpleUser, ClubWiseUser } = User;

/* GET users listing. */
router.post("/signUp", async (req, res, next) => {
  const {
    type,
    name,
    email,
    password,
    course,
    whatsAppPhone,
    phone,
    clubName,
    clubPosition,
  } = req.body;
  const newUser = {
    type,
    name,
    email,
    password,
    course,
    whatsAppPhone,
    phone,
    clubName,
    clubPosition,
  };

  Club.findOne({ clubName: clubName })
    .then((result) => {
      if (result != null) {
        const CurrentClubUser = ClubWiseUser(result.clubCode);
        CurrentClubUser.findOne({ email: newUser.email })
          .then((result) => {
            if (result != null) {
              throw error;
            } else {
              const newUserObject = new CurrentClubUser(newUser);
              newUserObject
                .save()
                .then((result) => {
                  console.log(result);
                  res.statusCode = 200;
                  res.send(result);
                  return;
                })
                .catch((err) => {
                  if (err != null) {
                    console.log(err);
                    res.statusCode = 500;
                    res.send();
                    return;
                  }
                });
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
      } else {
        res.statusCode = 406; // NOT_ACCEPTABLE ERRORS
        res.send();
        return;
      }
    })
    .catch((err) => {
      res.statusCode = 406; // NOT_ACCEPTABLE ERRORS
      res.send();
      return;
    });
});

router.post("/login", (req, res, next) => {
  const { email, password, clubName } = req.body;
  console.log(req.body);
  Club.findOne({ clubName: clubName })
    .then((clubDetail) => {
      if (clubDetail != null) {
        const CurrentClubUser = ClubWiseUser(clubDetail.clubCode);
        CurrentClubUser.findOne({ email: email, password: password })
          .then((result) => {
            if (result != null) {
              res.statusCode = 200;
              res.send(result);
              return;
            } else {
              res.statusCode = 400;
              res.send(false);
              return;
            }
          })
          .catch((err) => {
            if (err != null) {
              res.statusCode = 500;
              res.send(false);
              return;
            }
          });
      }
    })
    .catch((err) => {
      if (err != null) {
        res.statusCode = 500;
        res.send(false);
        return;
      }
    });
});

module.exports = router;
