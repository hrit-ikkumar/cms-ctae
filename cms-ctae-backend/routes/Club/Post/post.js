const express = require("express");
const router = express.Router();
const Post = require("../../../Model/Post");
const Club = require("../../../Model/Club");

const { SimplePost, ClubWisePost } = Post;

router.post("/getPost", (req, res, next) => {
  const { clubName } = req.body;
  Club.findOne({ clubName: clubName })
    .then((result) => {
      if (result != null) {
        let CurrentClubPost = ClubWisePost(result.clubCode);
        CurrentClubPost.find({})
          .then((values) => {
            if (values != null) {
              res.statusCode = 200;
              res.send(values);
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

router.post("/create", (req, res, next) => {
  const {
    title,
    author,
    authorTitle,
    dateTime,
    content,
    link,
    clubName,
    imageLink,
  } = req.body;
  Club.findOne({ clubName: clubName })
    .then((result) => {
      if (result != null) {
        let CurrentClubPost = ClubWisePost(result.clubCode);
        let postData = {
          title,
          author,
          authorTitle,
          dateTime,
          content,
          link,
          imageLink,
        };
        let newPostInClub = new CurrentClubPost(postData);
        newPostInClub
          .save()
          .then((values) => {
            if (values != null) {
              res.statusCode = 200;
              res.send(values);
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

router.delete("/delete", (req, res, next) => {
  const {
    _id,
    title,
    author,
    authorTitle,
    dateTime,
    content,
    link,
    clubName,
    imageLink,
  } = req.body;
  Club.findOne({ clubName: clubName })
    .then((result) => {
      if (result != null) {
        let CurrentClubPost = ClubWisePost(result.clubCode);
        CurrentClubPost.findOneAndDelete(
          {
            _id: _id,
            title: title,
            author: author,
            authorTitle: authorTitle,
          },
          { useFindAndModify: true }
        )
          .then((values) => {
            if (values != null) {
              res.statusCode = 200;
              res.send(true);
              return;
            } else {
              res.statusCode = 400;
              res.send(false);
              return;
            }
          })
          .catch((err) => {
            if (err != null) {
              res.statusCode = 406;
              res.send(false);
              return;
            }
          });
      } else {
        res.statusCode = 400;
        res.send();
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

module.exports = router;
