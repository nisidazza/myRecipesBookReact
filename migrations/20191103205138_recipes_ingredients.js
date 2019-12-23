

exports.up = function(knex) {
    return knex.schema.createTable('recipes_ingredients', function (table) {
        table.integer('recipe_id')
        table.integer('ingredient_id')
        table.primary(['recipe_id','ingredient_id'])
        table.string('quantity')
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('recipes_ingredients')
};