const express = require("express");
const router = express.Router();

const passwordReset = require("../passResetConfig");

//Route for requesting a new reset token
router.post(
  "/password/requestToken",
  passwordReset.requestResetToken({
    loginParam: "login",
    callbackURL: "/resetPassword/?token={token}",
    next: false
  }),
  function(req, res) {
    // ...something
    res.sendStatus(404);
  }
);

//Route for actually reseting passwords
router.put(
  "/password/reset",
  passwordReset.resetPassword({
    tokenParam: "token",
    passwordParam: "password",
    confirmParam: "confirm",
    next: false
  }),
  function(req, res) {
    // ...something
    res.sendStatus(404);
  }
);



module.exports = router;
