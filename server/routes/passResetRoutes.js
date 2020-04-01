const express = require("express");
const router = express.Router();

const passwordReset = require("../passResetConfig");


//Route for requesting a new reset token

router.post(
  "/password/reset",
  passwordReset.requestResetToken({
    loginParam: "login",
    callbackURL: "/{token}",
    next: false
  }),
  function(req, res) {
    // ...something
    res.sendStatus(404)
  }
);

//Route for actually reseting passwords

router.put(
  "/password/reset",
  passwordReset.resetPassword({
    tokenParam: "token",
    passwordParam: "password",
    confirmParam: "confirm",
    next: true
  }),
  function(req, res) {
    // ...something
  }
);

module.exports = router;
