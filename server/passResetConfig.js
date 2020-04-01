var passReset = require("pass-reset");
const { getUserByName } = require('./db/dbUsers')

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
    callback(null)
});

passReset.storage.setStore({
    create: (id, token, callback) => {
        let expire = passReset.expireTimeout()
        callback(null)
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
