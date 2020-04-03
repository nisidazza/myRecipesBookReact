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

function getToken(token, db=connection){
  return db("password_reset_tokens")
  .select()
  .where("token", token)
}

function deleteToken(token, db=connection){
  return db("password_reset_tokens")
  .where("token", token)
  .delete()
}

module.exports = {
  addUserToken,
  getToken,
  deleteToken
};
