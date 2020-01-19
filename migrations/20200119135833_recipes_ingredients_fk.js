

exports.up = function (knex) {
    return knex.schema.table('recipes_ingredients', table => {
        table.foreign('recipe_id').references('recipes.id')
        table.foreign('ingredient_id').references('ingredients.id')
    })
};

exports.down = function (knex) {
    return knex.schema.table('recipes_ingredients', table => {
        table.dropForeign('recipe_id')
        table.dropForeign('ingredient_id')
    })
};