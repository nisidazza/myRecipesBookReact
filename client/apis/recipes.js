import request from 'superagent'

const ingredientsUrl = '/api/v1/ingredients'

// export function apiGetRecipes() {
//     return request.get(recipesUrl)
//     .then(res => res.body)
// }
export function apiGetIngredients() {
    return request.get(ingredientsUrl)
        .then(res => console.log(res.body))
}