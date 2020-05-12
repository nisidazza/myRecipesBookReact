const connection = require('./connection')

function addIngredient(ingredient, db = connection) {
    return db('ingredients')
        .insert(ingredient
            , ['*'])
}

function getIngredient(id, db = connection) {
    return db('ingredients')
        .where('id', id)
        .first()
}

function getListIngredients(db = connection) {
    return db('ingredients')
        .select()
        .where('is_reviewed', true)
        .orderBy('ingredients.name')
}

function deleteIngredient(id, db=connection) {
    return db('ingredients') 
    .where('id', id)
    .first()
    .delete()
}

function updateIngredient(id, ingredient, db=connection) {
    return db('ingredients')
    .where('id', id)
    .update(ingredient, ['id', 'name'])
}

module.exports = {
    addIngredient,
    getIngredient,
    getListIngredients,
    deleteIngredient,
    updateIngredient
}