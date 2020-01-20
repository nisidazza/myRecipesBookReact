import request from 'superagent'
const ingredientsUrl = 'api/v1/ingredients'

export function apiGetIngredients() {
    return request.get(ingredientsUrl)
        .catch(() => {
            throw Error('you need to implement an API route for /api/v1/ingredients')
        })
        .then(res => res.body)
}

