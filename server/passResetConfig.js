var passReset = require("pass-reset");
var sendPasswordResetEmail = require("./mailSender");

const { getUserByName } = require("./db/dbUsers");

const {
  addUserToken,
  getToken,
  deleteToken,
} = require("./db/dbPassResetTokens");

const { updatePassword } = require("./db/dbUsers");

const expireTimeout = {
  value: 60,
  type: "minutes",
};

//expiration
passReset.expireTimeout(expireTimeout.value, expireTimeout.type);

//send email
/*
resets: [{
    token: GUID,
    name: user@email.com
    url: /.../GUID
}]
*/
passReset.sendEmail((email, resets, callback) => {
  let userData = resets[0];
  sendPasswordResetEmail(userData, expireTimeout).then(
    function (data) {
      console.log("API called successfully. Returned data: " + data);
      callback(null);
    },
    function (error) {
      error.message = "Sendinblue error. " + error.message;
      callback(error);
    }
  );
  console.log(resets[0].token);
});

passReset.storage.setStore({
  create: (id, token, callback) => {
    let expireTimeMinutes = passReset.expireTimeout();
    let date = new Date();
    date.setUTCMinutes(date.getUTCMinutes() + expireTimeMinutes);
    let expireDate = date.toUTCString();
    return addUserToken(id, token, expireDate)
      .then(() => {
        callback(null);
      })
      .catch((err) => {
        callback(err);
      });
  },
  lookup: (token, callback) => {
    return getToken(token)
      .then((tokenRow) => {
        //opt: verify the user is not auth
        let currentDateTime = new Date();
        let tokenExpireDateTime = new Date(tokenRow[0].expire_date_time);
        //verify token is valid
        if (currentDateTime > tokenExpireDateTime) {
          return callback(null, null);
        }
        callback(null, tokenRow[0].user_id);
      })
      .catch((err) => {
        callback(err);
      });
  },
  destroy: (token, callback) => {
    return deleteToken(token)
      .then((numberOfDeletedRows) => {
        callback(null);
      })
      .catch((err) => {
        callback(err);
      });
  },
});

passReset.setPassword((id, password, callback) => {
  return updatePassword(id, password)
    .then((numberOfUpdatedRows) => {
      if (numberOfUpdatedRows == 0) {
        return callback(null, false, "Could not update password.");
      }
      callback(null, true);
    })
    .catch((err) => {
      callback("SQL ERROR: " + err);
    });
});

passReset.lookupUsers((login, callback) => {
  return getUserByName(login)
    .then((user) => {
      if (!user) {
        return callback(null, false);
      }
      return callback(null, {
        email: user.username,
        users: [
          {
            id: user.id,
            name: user.username,
          },
        ],
      });
    })
    .catch((err) => {
      return callback(err);
    });
});

module.exports = passReset;
