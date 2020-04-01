var passReset = require("pass-reset");
const { getUserByName } = require('./db/dbUsers')
const {addUserToken} = require('./db/dbPassResetTokens')

//expiration
passReset.expireTimeout(60, "minutes");

//send email

passReset.sendEmail((email, resets, callback) => {
  /*choose mailer
        .send({
        to: email,
        from: 'noreply@example.com',
        subject: 'password reset',
        body: template({ resets: resets })
    });
    callback(null, true);
    })*/
    console.log(resets[0].token)
    callback(null)
});

passReset.storage.setStore({
    create: (id, token, callback) => {
        let expireTimeMinutes = passReset.expireTimeout()
        let date = new Date()
        date.setUTCMinutes(date.getUTCMinutes() + expireTimeMinutes);
        let expireDate = date.toUTCString()
        return addUserToken(id, token, expireDate)
        .then(() => {
            callback(null)
        })
        .catch(err => {
            callback(err)
        })            
    },
    lookup: (token, callback) => {
        callback("lookup - not implemented")
    },
    destroy: (token, callback) => {
        callback("destroy - not implemented")
    }
})

passReset.lookupUsers((login, callback) =>{
    return getUserByName(login)
    .then(user => {
        if(!user) {
            return callback(null, false);
        }
        return callback(null, {
            email: user.username,
            users: [{
                id: user.id,
                name: user.username
            }]
        })
    })
    .catch(err => {
        return callback(err);
    })
});

module.exports = passReset
