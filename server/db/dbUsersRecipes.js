const connection = require('./connection')

function getUserPrivateRecipes(userId, db = connection) {
    return db('recipes')
        .select()
        .where('is_public', false)
        .where('user_id', userId)
        .orderBy('recipes.title')
}

function getUserRecipes(userId, db = connection) {
    return db('recipes')
        .select()
        .where('user_id', userId)
        .orderBy('recipes.title')
}




module.exports = {
    getUserPrivateRecipes,
    getUserRecipes
}