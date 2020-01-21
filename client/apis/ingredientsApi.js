import request from 'superagent'
const ingredientsUrl = 'api/v1/ingredients'

export function apiAddNewIngredient(ingredientName) {
    console.log(ingredientName)
    return request.post(ingredientsUrl)
        .catch(() => {
            throw Error('you need to implement an API route for /api/v1/ingredients')
        })
        .send(ingredientName)
    // .then(res => res.body)
}

export function apiDeleteIngredient(id) {
    return request.delete(`ingredientsUrl/${id}`)
        .catch((err) => {
            console.log(err)
            throw Error('API route not found')
        })
}

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

export function apiUpdateIngredient(id, ingredient) {
    return request.patch(`ingredientsUrl/${id}`)
        .send(ingredient)
        .catch((err) => {
            console.log(err)
            throw Error('API route not found')
        })
}



