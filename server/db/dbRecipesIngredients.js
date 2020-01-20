const connection = require('./connection')


function addIngredientToRecipe(recipe_id, ingredient_id, quantity, db = connection) {
    return db('recipes_ingredients')
        .where('recipe_id', recipe_id)
        .where('ingredient_id', ingredient_id)
        .select()
        .then(rows => {
            if (rows.length == 0) {
                return db('recipes_ingredients')
                    .insert({
                        recipe_id,
                        ingredient_id,
                        quantity
                    })
            } else {
                throw new Error('INGREDIENT_CONFLICT')
            }
        })

}

function deleteIngredientFromRecipe(recipe_id, ingredient_id, db = connection) {
    return db('recipes_ingredients')
        .where('recipe_id', recipe_id)
        .where('ingredient_id', ingredient_id)
        .delete()
}

function getIngredients(id, db = connection) {
    return db.select('recipes_ingredients.ingredient_id AS id', 'ingredients.name', 'recipes_ingredients.quantity')
        .from('recipes')
        .innerJoin('recipes_ingredients', 'recipes_ingredients.recipe_id', 'recipes.id')
        .innerJoin('ingredients', 'recipes_ingredients.ingredient_id', 'ingredients.id')
        .where('recipes.id', id)
}

function getIngredientInRecipe(recipeId, ingredientId, db = connection) {
    return db.select('recipes_ingredients.ingredient_id AS id', 'ingredients.name', 'recipes_ingredients.quantity')
        .from('ingredients')
        .innerJoin('recipes_ingredients', 'recipes_ingredients.ingredient_id', 'ingredients.id')
        .where('recipes_ingredients.recipe_id', recipeId)
        .where('ingredients.id', ingredientId)
}

function getRecipesByIngredient(ingredientId, db = connection) {
    return db('recipes_ingredients')
        .innerJoin('recipes', 'recipes.id', 'recipes_ingredients.recipe_id')
        .where('recipes_ingredients.ingredient_id', ingredientId)
        .select('recipes.id', 'recipes.title')
}

function updateIngredientInRecipe(recipe_id, ingredient_id, quantity, db = connection) {
    return db('recipes_ingredients')
        .where('recipe_id', recipe_id)
        .where('ingredient_id', ingredient_id)
        .update({
            quantity
        })
}

module.exports = {
    getIngredients,
    getRecipesByIngredient,
    addIngredientToRecipe,
    deleteIngredientFromRecipe,
    updateIngredientInRecipe,
    getIngredientInRecipe
}