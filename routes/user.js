const mongoose = require("mongoose");
const express = require("express");
const checkLogin = require("../middlewares/checkLogin");
const router = express.Router();
const User = mongoose.model("User");

router.get("/user-details", checkLogin, (req, res) => {
  User.findOne({ _id: req.user._id })
    .select("-password")
    .then(user => res.json({ user }))
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err.message });
    });
});

module.exports = router;
