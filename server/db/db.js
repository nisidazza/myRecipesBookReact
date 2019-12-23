const environment = process.env.NODE_ENV || 'development'
const config = require('../../knexfile')[environment]
const connection = require('knex')(config)


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
    return db.select('ingredients.name AS ingredient_name', 'recipes_ingredients.quantity AS ingredient_quantity')
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
    if (new_ingredients){
        if (!ingredient_ids){        
            ingredient_ids = [];
            for(var i = 0; i < length; i++) {
                ingredient_ids.push(-1);
            }
        }

        for(let i=0; i<new_ingredients.length; i++) {
            let name =  new_ingredients[i].trim()
            if(name != "") {
                await db('ingredients')
                    .insert({ name }, 'id')
                    .then(id => {
                        ingredient_ids[i] = id[0]
                    })                
            }
        }
    }

    var newRows = []
    
    if (ingredient_ids){
        for(var i=0;i<ingredient_ids.length;i++){
            newRows.push({
                recipe_id : newRecipeId,
                ingredient_id : ingredient_ids[i],
                quantity : ingredient_quantities[i]
            })
        }
    }   

    return db('recipes_ingredients')
        .insert(newRows)
}

function deleteRecipe(id, db=connection) {
    return db('recipes')
    .where('id', id).first()
    .delete()
}

function getRecipesByIngredient(ingredientId, db=connection) {
    return db('recipes_ingredients')
    .innerJoin('recipes', 'recipes.id','recipes_ingredients.recipe_id')
    .where('recipes_ingredients.ingredient_id', ingredientId)
    .select('recipes.id', 'recipes.title')
}




module.exports = {
    getListRecipes,
    getRecipe,
    getIngredients,
    addRecipe,
    linkRecipeIngredients,
    getListIngredients,
    deleteRecipe,
    getRecipesByIngredient
}