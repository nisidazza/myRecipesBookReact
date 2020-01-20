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
        .orderBy('ingredients.name')
}

module.exports = {
    addIngredient,
    getIngredient,
    getListIngredients,
}