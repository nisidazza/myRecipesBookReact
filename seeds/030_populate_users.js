const { generateHash } = require('authenticare/server')

exports.seed = async knex => {
    await knex('users').insert([
        {
            id: 1,
            username: "Pippo",
            hash: await generateHash("P1ppo@123")
        },
        {
            id: 2,
            username: "nisida.azzalini@gmail.com",
            hash: await generateHash("cP3_wyz0")
        },
        {
            id: 3,
            username: "FoodLover",
            hash: await generateHash("Time4c%king")
        }
    ])
    await knex.raw("SELECT setval('users_id_seq', (SELECT MAX(id) FROM users));")
}