const express = require('express')
const router = express.Router()

const dbRecipes = require('../db/dbRecipes')
const dbRecipesIngredients = require('../db/dbRecipesIngredients')

const { getTokenDecoder } = require('authenticare/server')

// GET /apiv1/recipes/public
router.get('/public', (req, res) => {
    dbRecipes.getPublicRecipes()
        .then(publicRecipes => {
            res.json(publicRecipes)
        })
        .catch(err => {
            res.status(500).json({ message: 'Something is broken' })
        })
})

//GET /api/v1/recipes
router.get('/', (req, res) => {
    dbRecipes.getListRecipes()
        .then(recipes => {
            //console.log(recipes)
            res.json(recipes)
        })
        .catch(err => {
            res.status(500).json({ message: 'Something is broken' })
        })
})


// GET /api/v1/recipes/:id
router.get('/:id', (req, res) => {
    const { id } = req.params
    dbRecipes.getRecipe(id)
        .then(recipeDetail => {
            dbRecipesIngredients.getIngredients(id)
                .then(ingredients => {
                    res.json({ ...recipeDetail, ingredients })
                })
        })
        .catch(err => {
            res.status(500).json({ message: 'Something is broken' })
        })
})

// DELETE /api/v1/recipes/:id
router.delete('/:id', getTokenDecoder(), (req, res) => {
    const { id } = req.params
    if (req.user) {
        console.log('username:', req.user.username)
    } else {
        console.log('authentication token not provided')
    }
    dbRecipes.deleteRecipe(id)
        .then(hasBeenDeleted => {
            if (hasBeenDeleted) {
                res.sendStatus(204)
            } else {
                res.sendStatus(404)
            }
        })
        .catch(err => {
            res.status(500).json({ message: 'Something is broken' })
        })
})

router.patch('/:id', getTokenDecoder(), (req, res) => {
    const { id } = req.params
    const recipe = req.body
    const loggedUser = req.user.id
    if (loggedUser === recipe.user_id) {
        //console.log('username:', req.user.username)
        dbRecipes.editRecipe(id, recipe)
            .then(({ hasBeenUpdated, newRecipe }) => {
                if (hasBeenUpdated) {
                    res.status(200).json(newRecipe)
                } else {
                    res.sendStatus(404)
                }
            })
            .catch(err => {
                res.status(500).json({ message: 'Something is broken' })
            })
    } else {
        console.log(`user ${req.user.username} cannot edit recipe ${recipe.title} `)
        res.sendStatus(403)
    }

})



module.exports = router