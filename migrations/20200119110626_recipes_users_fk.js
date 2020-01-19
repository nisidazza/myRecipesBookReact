
exports.up = function (knex) {
    return knex.schema.table('recipes', table => {
        table.integer('user_id')//.notNullable()
        table.foreign('user_id').references('users.id')
    })
};

exports.down = function (knex) {
    return knex.schema.table('recipes', table => {
        table.dropColumn('user_id')
    })
};
