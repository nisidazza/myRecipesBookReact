import {httpClient} from './httpClient'
const ingredientsUrl = 'api/v1/ingredients'

export function apiAddNewIngredient(ingredientName) {
    console.log(ingredientName)
    return httpClient.post(ingredientsUrl)
        .catch(() => {
            throw Error('you need to implement an API route for /api/v1/ingredients')
        })
        .send(ingredientName)
    // .then(res => res.body)
}

export function apiDeleteIngredient(id) {
    return httpClient.delete(`ingredientsUrl/${id}`)
        .catch((err) => {
            console.log(err)
            throw Error('API route not found')
        })
}

export function apiGetIngredients() {
    return httpClient.get(ingredientsUrl)
        .catch(() => {
            throw Error('you need to implement an API route for /api/v1/ingredients')
        })
        .then(res => res.body)
}

export function apiGetIngredient(id) {
    return httpClient.get(`ingredientsUrl/${id}`)
        .catch(() => {
            throw Error('you need to implement an API route for /api/v1/ingredients/:id')
        })
        .then(res => res.body)
}

export function apiUpdateIngredient(id, ingredient) {
    return httpClient.patch(`ingredientsUrl/${id}`)
        .send(ingredient)
        .catch((err) => {
            console.log(err)
            throw Error('API route not found')
        })
}



