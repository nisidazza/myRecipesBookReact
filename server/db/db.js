const connection = require('./connection')

function getListRecipes(db = connection) {
    return db('recipes')
        .select()
        .orderBy('recipes.title')
}

function getListIngredients(db = connection) {
    return db('ingredients')
        .select()
        .orderBy('ingredients.name')
}

function getIngredients(id, db = connection) {
    return db.select('recipes_ingredients.ingredient_id AS id', 'ingredients.name', 'recipes_ingredients.quantity')
        .from('recipes')
        .innerJoin('recipes_ingredients', 'recipes_ingredients.recipe_id', 'recipes.id')
        .innerJoin('ingredients', 'recipes_ingredients.ingredient_id', 'ingredients.id')
        .where('recipes.id', id)
}

function getRecipe(id, db = connection) {
    return db('recipes')
        .where('id', id).first()

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

function deleteRecipe(id, db = connection) {
    return db('recipes')
        .where('id', id).first()
        .delete()
}

function getRecipesByIngredient(ingredientId, db = connection) {
    return db('recipes_ingredients')
        .innerJoin('recipes', 'recipes.id', 'recipes_ingredients.recipe_id')
        .where('recipes_ingredients.ingredient_id', ingredientId)
        .select('recipes.id', 'recipes.title')
}


function editRecipe(id, newRecipe, db = connection) {
    return db('recipes')
        .where('id', id)
        .select()
        .then(oldRecipe => {
            if (oldRecipe.length == 0) return {hasBeenUpdated:false}            
            return db('recipes')
                .where('id', id)
                .update({
                    title: newRecipe.title ? newRecipe.title : oldRecipe[0].title,
                    category: newRecipe.category ? newRecipe.category : oldRecipe[0].category,
                    link: newRecipe.link ? newRecipe.link : oldRecipe[0].link,
                    notes: newRecipe.notes ? newRecipe.notes : oldRecipe[0].notes
                })                
                .then(hasBeenUpdated =>{
                    return db('recipes')
                        .where('id', id)
                        .select()
                        .then(newRecipe => {
                            return {
                                hasBeenUpdated,
                                newRecipe: newRecipe[0]        
                            }
                        })
                })
        })        
}

function addIngredientToRecipe(recipe_id, ingredient_id, quantity, db = connection) {
    return db('recipes_ingredients')
        .insert({
            recipe_id,
            ingredient_id,
            quantity
        })
}

function deleteIngredientFromRecipe() {
    return db('recipes_ingredients')
        .where('recipe_id', recipe_id)
        .where('ingredient_id', ingredient_id)
        .delete()
}


module.exports = {
    getListRecipes,
    getRecipe,
    getIngredients,
    addRecipe,
    linkRecipeIngredients,
    getListIngredients,
    deleteRecipe,
    getRecipesByIngredient,
    editRecipe,
    addIngredientToRecipe,
    deleteIngredientFromRecipe
}