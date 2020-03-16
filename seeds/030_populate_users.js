const { generateHash } = require('authenticare/server')

exports.seed = async knex => {
    await knex('users').insert([
        {
            id: 1,
            username: "Pippo",
            hash: await generateHash("123")
        },
        {
            id: 2,
            username: "Nisida",
            hash: await generateHash("1987")
        },
        {
            id: 3,
            username: "FoodLover",
            hash: await generateHash("time4cooking")
        }
    ])
    await knex.raw("SELECT setval('users_id_seq', (SELECT MAX(id) FROM users));")
}