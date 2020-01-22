import request from 'superagent'

const usersUrl = 'api/v1/users'


export function apiGetUserRecipes(userId) {
    return request.get(`${usersUrl}/${userId}/recipes`)
        .catch(() => {
            throw Error('you need to implement an API route for /api/v1/users/:id/recipes')
        })
        .then((res) => {
            return res.body
        })
}


export function apiGetUserPrivateRecipes(userId) {
    return request.get(`${usersUrl}/${userId}/recipes/private`)
        .catch(() => {
            throw Error('you need to implement an API route for /api/v1/users/:id/recipes/private')
        })
        .then((res) => {
            return res.body
        })
}
