const { generateHash } = require('authenticare/server')

exports.seed = knex =>
    generateHash("123")
        .then(hashedPassword =>
            knex('users').insert([
                {
                    id: 1,
                    username: "Pippo",
                    hash: hashedPassword
                },
                {
                    id: 2,
                    username: "Nisida",
                    hash: hashedPassword
                }
            ]).then(() => {
                knex.raw('SELECT setval("ingredients_id_seq", (SELECT MAX(id) from "test"))')
            })
        )