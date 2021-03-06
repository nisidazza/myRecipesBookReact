const connection = require("./connection");
//node-module
const { generateHash } = require("authenticare/server");

function createUser(user, db = connection) {
  return userExists(user.username, db)
    .then(exists => {
      if (exists) {
        return Promise.reject(new Error("User exists"));
      }
    })
    .then(() => generateHash(user.password))
    .then(passwordHash => {
      return db("users").insert({
        username: user.username,
        hash: passwordHash
      });
    });
}

function userExists(username, db = connection) {
  return db("users")
    .count("id as n")
    .where("username", username)
    .then(count => {
      return count[0].n > 0;
    });
}

function getUserByName(username, db = connection) {
  return db("users")
    .select()
    .where("username", username)
    .first();
}

function updatePassword(userId, newPassword, db = connection) {
  return generateHash(newPassword)
  .then(newHash => {
    return db("users")
      .update({
        hash: newHash
      })
      .where("id", userId);
  });
}

module.exports = {
  createUser,
  userExists,
  getUserByName,
  updatePassword
};
