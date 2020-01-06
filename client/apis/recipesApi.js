import request from 'superagent'

const recipesUrl = 'api/v1/recipes'
const ingredientsUrl = 'api/v1/ingredients'
const recipeDetailsUrl = 'api/v1/recipe'


export function apiGetRecipes() {
    return request.get(recipesUrl)
        .then((res) => {
            return res.body
        })        
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
    return request.delete(`${recipesUrl}/${id}`)
        .then(res =>  {
            if (res.status <= 299) return true;
            if (res.status == 404) return false;
            //TODO: what should we do in case of redirect?
            throw Error('Unexpected HTTP Code ' + res.status)
        })
        .catch(() => {
            throw Error('API route not found')
        })
}

export function apiGetRecipeDetails(id) {
    return request.get(`${recipeDetailsUrl}/${id}`)
    .then(res => res.body)
    .catch(() => {
        throw Error ('you need to implement an API route for /api/v1/recipe/:id')
    })
}