import request from 'superagent'

const recipesUrl = 'api/v1/recipes'
const ingredientsUrl = 'api/v1/ingredients'



export function apiGetRecipes() {
    return request.get(recipesUrl)
        .catch(() => {
            throw Error('you need to implement an API route for /api/v1/recipes')
        })
        .then((res) => {
            return res.body
        })
}

export function apiGetIngredients() {
    return request.get(ingredientsUrl)
        .catch(() => {
            throw Error('you need to implement an API route for /api/v1/ingredients')
        })
        .then(res => res.body)
}

export function apiDeleteRecipe(id) {
    return request.delete(`${recipesUrl}/${id}`)
        .catch(() => {
            throw Error('API route not found')
        })
        .then(res => {
            if (res.status <= 299) return true
            if (res.status == 404) return false
            //TODO: what should we do in case of redirect?
            throw Error('Unexpected HTTP Code ' + res.status)
        })
}

export function apiGetRecipeDetails(id) {
    return request.get(`${recipesUrl}/${id}`)
        .catch(() => {
            throw Error('you need to implement an API route for /api/v1/recipes/:id')
        })
        .then(res => res.body)
}

export function apiEditRecipeDetails(recipe) {
    return request.patch(`${recipesUrl}/${recipe.id}`)
        .send(recipe)
        .catch(() => {
            throw Error('API route not found')
        })
        .then(res => {
            if (res.status == 200) return res.body
            throw Error('Unexpected HTTP Code ' + res.status)
        })
}