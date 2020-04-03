const connection = require("./connection");

function addUserToken(user_id, token, expire_date_time, db = connection) {
  return db("password_reset_tokens")
    .where("user_id", user_id)
    .del()
    .then(() => {
      return db("password_reset_tokens").insert({
        user_id,
        token,
        expire_date_time
      });
    });
}

function getUserToken(token, db=connection){
  return db("password_reset_tokens")
  .select()
  .where("token", token)
}

module.exports = {
  addUserToken,
  getUserToken
};
