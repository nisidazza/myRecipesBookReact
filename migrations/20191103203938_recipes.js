
exports.up = function(knex) {
    return knex.schema.createTable('recipes', function (table) {
        table.increments('id').primary()
        table.string('title')
        table.string('category')
        table.bool('is_complete')
        table.string('notes')
        table.string('link')
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('recipes')
};
