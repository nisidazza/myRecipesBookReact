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

function addIngredient(ingredient, db = connection) {
    return db('ingredients')
        .insert(ingredient
            , ['*'])
}

function addRecipe(title, category, link, notes, db = connection) {
    return db('recipes')
        .insert({
            title,
            category,
            link,
            notes
        }, 'id')
}

function deleteIngredientFromRecipe(recipe_id, ingredient_id, db = connection) {
    return db('recipes_ingredients')
        .where('recipe_id', recipe_id)
        .where('ingredient_id', ingredient_id)
        .delete()
}

function deleteRecipe(id, db = connection) {
    return db('recipes')
        .where('id', id).first()
        .delete()
}

function editRecipe(id, newRecipe, db = connection) {
    return db('recipes')
        .where('id', id)
        .select()
        .then(oldRecipe => {
            if (oldRecipe.length == 0) return { hasBeenUpdated: false }
            return db('recipes')
                .where('id', id)
                .update({
                    title: newRecipe.title ? newRecipe.title : oldRecipe[0].title,
                    category: newRecipe.category ? newRecipe.category : oldRecipe[0].category,
                    link: newRecipe.link ? newRecipe.link : oldRecipe[0].link,
                    notes: newRecipe.notes ? newRecipe.notes : oldRecipe[0].notes
                }, ['*'])
                .then(updatedRecipes => {
                    let hasBeenUpdated = updatedRecipes && updatedRecipes.length > 0
                    let newRecipe = hasBeenUpdated ? updatedRecipes[0] : null
                    return {
                        hasBeenUpdated,
                        newRecipe
                    }
                })
        })
}

function getIngredient(id, db = connection) {
    return db('ingredients')
        .where('id', id)
        .first()
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

function getListIngredients(db = connection) {
    return db('ingredients')
        .select()
        .orderBy('ingredients.name')
}

function getListRecipes(db = connection) {
    return db('recipes')
        .select()
        .orderBy('recipes.title')
}

function getRecipe(id, db = connection) {
    return db('recipes')
        .where('id', id).first()

}

function getRecipesByIngredient(ingredientId, db = connection) {
    return db('recipes_ingredients')
        .innerJoin('recipes', 'recipes.id', 'recipes_ingredients.recipe_id')
        .where('recipes_ingredients.ingredient_id', ingredientId)
        .select('recipes.id', 'recipes.title')
}


async function linkRecipeIngredients(newRecipeId, ingredient_ids, ingredient_quantities, new_ingredients, db = connection) {
    if (new_ingredients) {
        if (!ingredient_ids) {
            ingredient_ids = [];
            for (var i = 0; i < length; i++) {
                ingredient_ids.push(-1);
            }
        }

        for (let i = 0; i < new_ingredients.length; i++) {
            let name = new_ingredients[i].trim()
            if (name != "") {
                await db('ingredients')
                    .insert({ name }, 'id')
                    .then(id => {
                        ingredient_ids[i] = id[0]
                    })
            }
        }
    }

    var newRows = []

    if (ingredient_ids) {
        for (var i = 0; i < ingredient_ids.length; i++) {
            newRows.push({
                recipe_id: newRecipeId,
                ingredient_id: ingredient_ids[i],
                quantity: ingredient_quantities[i]
            })
        }
    }

    return db('recipes_ingredients')
        .insert(newRows)
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
    getListRecipes,
    getRecipe,
    getIngredient,
    getIngredients,
    addRecipe,
    addIngredient,
    linkRecipeIngredients,
    getListIngredients,
    deleteRecipe,
    getRecipesByIngredient,
    editRecipe,
    addIngredientToRecipe,
    deleteIngredientFromRecipe,
    updateIngredientInRecipe,
    getIngredientInRecipe
}