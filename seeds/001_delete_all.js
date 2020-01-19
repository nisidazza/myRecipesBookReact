exports.seed = knex =>
    knex('recipes_ingredients').del()
        .then(() =>  knex('recipes').del())
        .then(() => knex('ingredients').del())
        .then(() => knex('users').del())
