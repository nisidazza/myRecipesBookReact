const { generateHash } = require('authenticare/server')

exports.seed = knex =>
    knex('users').del()
        .then(() =>
            generateHash("123")
        )
        .then(hashedPassword =>
            knex('users').insert([
                {
                    id: 1,
                    username: "Pippo",
                    hash: hashedPassword
                }])
        )