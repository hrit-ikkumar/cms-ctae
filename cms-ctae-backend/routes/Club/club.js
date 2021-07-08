var express = require("express");
var router = express.Router();
const Club = require("../../Model/Club"); // mongoose.model('User');

// All Club Details 
router.get('/', (req, res, next) => {
  Club.find({})
  .then((result) => {
    if(result!=null) {
      res.statusCode = 200;
      res.send(result);
      return;
    }
    else
    {
      res.statusCode = 406;
      res.send({err: "Don't have any records in our DB"});
      return;
    }
  })
  .catch((err) => {
    res.statusCode = 500; //INTERNAL SERVER ERROR
    res.send({err});
    return;
  })
});

// Create a new Club in System
router.post('/register', (req, res, next) => {
  const {clubName, clubCode} = req.body;
  const newClub = {
    clubName:clubName,
    clubCode:clubCode
  }
  Club.findOne({clubName: newClub.clubName})
  .then((result) => {
    if(result != null)
    {
      throw error;
    }
    else
    {
      const newClubEntry = new Club(newClub);
      newClubEntry
      .save()
      .then((result) => {
        res.statusCode = 200;
        res.send(result);
        return;
      })
      .catch((err) => {
        if(err != null) {
          console.log(err);
          res.statusCode = 500;
          res.send();
          return;
        }
      });
    }
  })
  .catch((err) => {
    if(err != null) {
      res.statusCode = 406;
      res.send();
      return;
    }
  });
});

module.exports = router;