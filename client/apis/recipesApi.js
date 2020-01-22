import request from 'superagent'
import { getEncodedToken } from 'authenticare/client'

const recipesUrl = 'api/v1/recipes'


export function apiAddIngredientToRecipe(recipe_id, ingredient_id, quantity) {
    return request.post(`${recipesUrl}/${recipe_id}/ingredients/${ingredient_id}`)
        .set({ 'Accept': 'application/json' })
        .set({ 'Authorization': `Bearer ${getEncodedToken()}` })
        .send({
            quantity
        }).catch(() => {
            throw Error('API route not found')
        })
        .then(res => {
            if (res.status == 201) {
                return ingredient_id
            } else if (res.status == 404) {
                return -1
            } else if (res.status == 409) {
                return -1
            } else {
                return -1
            }
        })
}

export function apiDeleteIngredientFromRecipe(recipe_id, ingredient_id) {
    return request.delete(`${recipesUrl}/${recipe_id}/ingredients/${ingredient_id}`)
        .set({ 'Accept': 'application/json' })
        .set({ 'Authorization': `Bearer ${getEncodedToken()}` })
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

export function apiDeleteRecipe(id) {
    return request.delete(`${recipesUrl}/${id}`)
        .set({ 'Accept': 'application/json' })
        .set({ 'Authorization': `Bearer ${getEncodedToken()}` })
        .catch((err) => {
            console.log(err)
            throw Error('API route not found')
        })
        .then(res => {
            if (res.status <= 299) return true
            if (res.status == 404) return false
            //TODO: what should we do in case of redirect?
            throw Error('Unexpected HTTP Code ' + res.status)
        })
}

export function apiGetPublicRecipes() {
    return request.get(`${recipesUrl}/public`)
        .catch(() => {
            throw Error('you need to implement an API route for /api/v1/recipes/public')
        })
        .then((res) => {
            return res.body
        })
}


export function apiGetIngredientFromRecipe(recipe_id, ingredient_id) {
    return request.get(`${recipesUrl}/${recipe_id}/ingredients/${ingredient_id}`)
        .catch(() => {
            throw Error('API route not found')
        })
        .then(res => {
            if (res.status == 200) {
                return res.body
            } else {
                throw Error('Unexpected HTTP Code ' + res.status)
            }
        })
}

export function apiGetRecipes() {
    return request.get(recipesUrl)
        .catch(() => {
            throw Error('you need to implement an API route for /api/v1/recipes')
        })
        .then((res) => {
            return res.body
        })
}

export function apiGetRecipeDetails(id) {
    return request.get(`${recipesUrl}/${id}`)
        .catch(() => {
            throw Error('you need to implement an API route for /api/v1/recipes/:id')
        })
        .then(res => res.body)
}

export function apiUpdateIngredientInRecipe(recipe_id, ingredient) {
    return request.patch(`${recipesUrl}/${recipe_id}/ingredients/${ingredient.id}`)
        .set({ 'Accept': 'application/json' })
        .set({ 'Authorization': `Bearer ${getEncodedToken()}` })
        .send(ingredient)
        .catch(() => {
            throw Error('API route not found')
        }).then(res => {
            if (res.status == 200) return res.body
            throw Error('Unexpected HTTP Code ' + res.status)
        })
}


export function apiUpdateRecipeDetails(recipe) {
    return request.patch(`${recipesUrl}/${recipe.id}`)
        .set({ 'Accept': 'application/json' })
        .set({ 'Authorization': `Bearer ${getEncodedToken()}` })
        .send(recipe)
        .catch((err) => {
            console.log(err)
            throw Error('API route not found')
        })
        .then(res => {
            if (res.status == 200) return res.body
            throw Error('Unexpected HTTP Code ' + res.status)
        })
}


