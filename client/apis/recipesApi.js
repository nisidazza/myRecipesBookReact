import request from 'superagent'

const recipesUrl = 'api/v1/recipes'
const ingredientsUrl = 'api/v1/ingredients'


export function apiGetRecipes() {
    return request.get(recipesUrl)
    .then(res => res.body)
    .catch(() => {
        throw Error ('you need to implement an API route for /api/v1/recipes')
    })
}

export function apiGetIngredients() {
    return request.get(ingredientsUrl)
        .then(res => res.body)
        .catch(() => {
            throw Error ('you need to implement an API route for /api/v1/ingredients')
        })
}

export function apiDeleteRecipe(id) {
    return request.delete(`api/v1/recipes/${id}`)
    .then(res =>  res.body)
    .catch(() => {
        throw Error('API route not found')
    })
}