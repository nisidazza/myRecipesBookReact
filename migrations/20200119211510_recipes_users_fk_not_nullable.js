
exports.up = function (knex) {
    return knex.schema.table('recipes', table => {
        table.integer('user_id').notNullable().alter()
    })
};

exports.down = function (knex) {
    return knex.schema.table('recipes', table => {
        table.integer('user_id').nullable().alter()
    })
};

