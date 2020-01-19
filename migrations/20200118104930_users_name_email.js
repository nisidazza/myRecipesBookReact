
exports.up = function(knex) {
    return knex.schema.table('users', table => {
        table.string('username').notNullable().alter()
        table.string('hash').notNullable().alter()

        table.string('first_name')
        table.string('last_name')
        table.string('email')
    })
};

exports.down = function(knex) {
    return knex.schema.table('users', table => {
        table.string('username').nullable().alter()
        table.string('hash').nullable().alter()
        
        table.dropColumn('first_name')
        table.dropColumn('last_name')
        table.dropColumn('email')
    })
};
