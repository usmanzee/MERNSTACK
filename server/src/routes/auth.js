const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = mongoose.model("User");
const requireLogin = require("../middlewares/requireLogin");

// router.get("/protected", requireLogin, (req, res) => {
//   res.send("Hello user");
// });

router.post("/signup", (req, res) => {
  const { name, email, password } = req.body;
  if (!email || !password || !name) {
    return res.status(400).json({
      error: "Please send all the required fields",
    });
  }
  User.findOne({ email: email }).then((savedUser) => {
    if (savedUser) {
      return res
        .status(400)
        .json({ error: "User already exists with that email" });
    } else {
      bcrypt.hash(password, 12).then((hashedPassword) => {
        const user = new User({
          email: email,
          name: name,
          password: hashedPassword,
        });
        user
          .save()
          .then((response) => {
            return res.json({ message: "Saved successfully!!!" });
          })
          .catch((error) => {
            console.log("Error while saving user", error);
          });
      });
    }
  });
});

router.post("/signin", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({
      error: "Please provide valid information.",
    });
  }
  User.findOne({ email: email }).then((savedUser) => {
    if (!savedUser) {
      return res.status(400).json({
        error: "Invalid Email Address OR Password",
      });
    }
    bcrypt
      .compare(password, savedUser.password)
      .then((didMatch) => {
        if (didMatch) {
          var token = jwt.sign({ _id: savedUser._id }, process.env.JWT_SECRET);
          return res.json({
            token: token,
            user: {
              _id: savedUser._id,
              name: savedUser.name,
              email: savedUser.email,
            },
            message: "Signin successfully ",
          });
          // res.json({
          //   message: "Successfully Signin!!!",
          // });
        } else {
          return res.status(400).json({
            error: "Invalid Email Address OR Password",
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  });
});

module.exports = router;
