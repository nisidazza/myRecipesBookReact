const connection = require('./connection')

function addRecipe(title, category, link, notes, db = connection) {
    return db('recipes')
        .insert({
            title,
            category,
            link,
            notes
        }, 'id')
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

function getPublicRecipes(db = connection) {
    return db('recipes')
        .select()
        .where('is_public', true)
        .orderBy('recipes.title')
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



module.exports = {
    addRecipe,
    deleteRecipe,
    editRecipe,
    getPublicRecipes,
    getListRecipes,
    getRecipe,
}
