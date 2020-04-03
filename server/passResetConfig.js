var passReset = require("pass-reset");
const { getUserByName } = require("./db/dbUsers");
const { addUserToken, getUserToken } = require("./db/dbPassResetTokens");
const { updatePassword } = require("./db/dbUsers");

const mailgun = require("mailgun-js")({
  apiKey: process.env.MAILGUN_API_KEY,
  domain: process.env.MAILGUN_DOMAIN
});

const expireTimeout = {
  value: 60,
  type: "minutes"
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
  userData.url = process.env.PUBLIC_BASE_URL + userData.url;
  const data = {
    from: "<noreply@nisida-book-recipes-react.herokuapp.com>",
    to: userData.name,
    subject: "Reset Password",
    text: `Hi ${userData.name}, you recently requested to reset your password for your account. Use this link ${userData.url} to reset it. This password reset is only valid for the next ${expireTimeout.value} ${expireTimeout.type}.`
  };
  mailgun.messages().send(data, (error, mailgunResponse) => {
    if (error) {
      error.message = "Mailgun error. " + error.message;
    }
    callback(error);
    console.log(mailgunResponse);
  });
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
      .catch(err => {
        callback(err);
      });
  },
  lookup: (token, callback) => {
    return getUserToken(token)
      .then(tokenRow => {
        //opt: verify the user is not auth
        let currentDateTime = new Date();
        let tokenExpireDateTime = new Date(tokenRow[0].expire_date_time);
        //verify token is valid
        if(currentDateTime > tokenExpireDateTime) {
          return callback(null, null)
        } 
        callback(null, tokenRow[0].user_id)
      })
      .catch(err => {
        callback(err);
      });
  },
  destroy: (token, callback) => {
    callback("destroy - not implemented");
  }
});

passReset.setPassword((id, password, callback) => {  
  return updatePassword(id, password)
  .then(numberOfUpdatedRows => {
    if(numberOfUpdatedRows == 0) {
      return callback(null, false, "Could not update password.")
    } 
    callback(null, true)
  })
  .catch(err => {
    callback("SQL ERROR: " + err)
  })
});

passReset.lookupUsers((login, callback) => {
  return getUserByName(login)
    .then(user => {
      if (!user) {
        return callback(null, false);
      }
      return callback(null, {
        email: user.username,
        users: [
          {
            id: user.id,
            name: user.username
          }
        ]
      });
    })
    .catch(err => {
      return callback(err);
    });
});

module.exports = passReset;
