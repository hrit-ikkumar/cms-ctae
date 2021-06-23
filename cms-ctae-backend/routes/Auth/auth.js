var express = require("express");
const mongoose = require('mongoose');
var router = express.Router();
const User = require('./Model/User');

/* GET users listing. */
router.post("/signUp", (req, res, next) => {
  const {
    uId,
    type,
    name,
    email,
    course,
    whatsAppPhone,
    phone,
    clubName,
    clubPosition,
  } = req.body;
  const newUser = {
    uId,
    type,
    name,
    email,
    course,
    whatsAppPhone,
    phone,
    clubName,
    clubPosition,
  };
  User.insertMany(new User(newUser), (err, user) => {
    if(err) {
      res.statusCode = 500;
      res.send({});
      return;
    }
    else
    {
      res.statusCode = 200;
      res.send(newUser);
      return;
    }
  });
});

module.exports = router;
/*
        const registrationData = {
          uid: user.uid,
          type: "user",
          name: formData.values.name,
          email: user.email,
          course: formData.values.course,
          year: formData.values.year,
          phone: formData.values.phone,
          whatsappPhone: formData.values.whatsappPhone,
        };
*/
