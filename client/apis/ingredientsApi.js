import request from 'superagent'
const ingredientsUrl = 'api/v1/ingredients'

export function apiGetIngredients() {
    return request.get(ingredientsUrl)
        .catch(() => {
            throw Error('you need to implement an API route for /api/v1/ingredients')
        })
        .then(res => res.body)
}

export function apiGetIngredient(id) {
    return request.get(`ingredientsUrl/${id}`)
        .catch(() => {
            throw Error('you need to implement an API route for /api/v1/ingredients/:id')
        })
        .then(res => res.body)
}

export function apiAddNewIngredient(ingredientName) {
    console.log(ingredientName)
    return request.post(ingredientsUrl)
        .catch(() => {
            throw Error('you need to implement an API route for /api/v1/ingredients')
        })
        .send(ingredientName)
        // .then(res => res.body)
}

