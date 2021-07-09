var express = require("express");
var router = express.Router();
const Club = require("../../Model/Club"); // mongoose.model('User');
const User = require("../../Model/User");

const { ClubWiseUser } = User;

// All Club Details
router.post("/getClubData", (req, res, next) => {
  const { clubName } = req.body;

  Club.findOne({ clubName: clubName })
    .then((result) => {
      if (result != null) {
        ClubWiseUser(result.clubCode)
          .find({})
          .then((members) => {
            res.statusCode = 200;
            result.clubMembers = members.map((member) => {
              return {
                name: member.name,
                email: member.email,
                clubPosition: member.clubPosition,
                avatar:
                  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bWVufGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80",
              };
            });
            res.send(result);
            console.log(result);
            return;
          })
          .catch((err) => {
            if (err !== null) {
              res.statusCode = 406;
              res.send();
              return;
            }
          });
      } else {
        res.statusCode = 406;
        res.send({ err: "Don't have any records in our DB" });
        return;
      }
    })
    .catch((err) => {
      res.statusCode = 500; //INTERNAL SERVER ERROR
      res.send({ err });
      return;
    });
});

// Create a new Club in System
router.post("/register", (req, res, next) => {
  const {
    clubName,
    clubCode,
    clubLogo,
    clubBanner,
    clubPhotos,
    clubDescription,
    socialMedia,
    clubMembers,
  } = req.body;
  const newClub = {
    clubName: clubName,
    clubCode: clubCode,
    clubLogo: clubLogo,
    clubBanner: clubBanner,
    clubPhotos: clubPhotos,
    clubDescription: clubDescription,
    socialMedia: socialMedia,
    clubMembers: clubMembers,
  };
  Club.findOne({ clubName: newClub.clubName })
    .then((result) => {
      if (result != null) {
        throw error;
      } else {
        const newClubEntry = new Club(newClub);
        newClubEntry
          .save()
          .then((result) => {
            res.statusCode = 200;
            res.send(result);
            return;
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
        res.statusCode = 406;
        res.send();
        return;
      }
    });
});

// Update a Club in System
router.put("/update", (req, res, next) => {
  const {
    clubName,
    clubCode,
    clubLogo,
    clubPhotos,
    clubBanner,
    clubDescription,
    socialMedia,
    prevData,
  } = req.body;
  const newClub = {
    clubName: clubName,
    clubCode: clubCode,
    clubLogo: clubLogo,
    clubBanner: clubBanner,
    clubPhotos: clubPhotos,
    clubDescription: clubDescription,
    socialMedia: socialMedia,
  };
  Club.findOne({ clubName: prevData.clubName })
    .then((result) => {
      if (result === null) {
        throw error;
      } else {
        Club.findOneAndUpdate(
          {
            _id: prevData._id,
            clubName: prevData.clubName,
            clubCode: prevData.clubCode,
          },
          { $set: newClub },
          { useFindAndModify: true }
        )
          .then((result) => {
            ClubWiseUser(clubCode)
              .updateMany(
                {},
                { $set: { clubName: clubName } },
                { multi: true, useFindAndModify: true }
              )
              .then((dt) => {
                res.statusCode = 200;
                res.send({ ...prevData, ...newClub });
                return;
              })
              .catch((err) => next(err));
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
        res.statusCode = 406;
        res.send();
        return;
      }
    });
});

// Add gallery images to club
router.post("/addImageForGallery", (req, res, next) => {
  const { clubName, image } = req.body;
  console.log(req.body);
  Club.findOneAndUpdate(
    { clubName },
    { $push: { clubPhotos: image } },
    { useFindAndModify: true }
  )
    .then((result) => {
      if (result != null) {
        res.statusCode = 200;
        res.send(true);
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
});

// All Club Details
router.get("/getAllClubData", (req, res, next) => {
  Club.find({})
    .then((result) => {
      console.log(result);
      if (result !== null) {
        res.statusCode = 200;
        const clubDataToBeSent = result.map((currentClub) => {
          return {
            clubName: currentClub.clubName,
            clubLogo: currentClub.clubLogo,
          };
        });
        res.send(clubDataToBeSent);
        return;
      } else {
        res.statusCode = 406;
        res.send({ err: "Don't have any records in our DB" });
        return;
      }
    })
    .catch((err) => {
      res.statusCode = 500; //INTERNAL SERVER ERROR
      res.send({ err });
      return;
    });
});

module.exports = router;
