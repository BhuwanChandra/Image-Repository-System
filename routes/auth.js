const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const User = mongoose.model("User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/keys");

router.post("/signup", (req, res) => {
  const { name, email, password } = req.body;
  if (!email || !name || !password) {
    return res.status(422).json({
      error: "please add all the fields."
    });
  }
  User.findOne({ email: email })
    .then(saveUser => {
      if (saveUser)
        return res.status(422).json({
          error: "Email already registered."
        });

      bcrypt
        .hash(password, 12)
        .then(hashPassword => {
          const user = new User({
            email,
            password: hashPassword,
            name
          });
          user
            .save()
            .then(user => {
              res.json({ message: "user saved successfully" });
            })
        })
    })
    .catch(err => {
      console.log(err);
      return res.status(500).json({ error: "Something went wrong!" });
    });
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(422).json({
      error: "please add all the fields."
    });

  User.findOne({ email: email })
    .then(savedUser => {
      if (!savedUser)
        return res.status(422).json({
          error: "Invalid Email or Password."
        });

      bcrypt
        .compare(password, savedUser.password)
        .then(doMatch => {
          if (doMatch) {
            const token = jwt.sign({ _id: savedUser._id }, JWT_SECRET);
            const { _id, name, email } = savedUser;
            res.json({
              message: "Successfully signed in!!!",
              token,
              user: { _id, name, email }
            });
          } else {
            return res
              .status(422)
              .json({ error: "Invalid Email or Password." });
          }
        });
    })
    .catch(err => {
      console.log(err);
      return res.status(500).json({ error: "Something went wrong!" });
    });
});

module.exports = router;
