const express = require('express')
const router = express.Router()

const db = require('../db/db')


//GET /api/v1/recipes
router.get('/', (req, res) => {
    db.getListRecipes()
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
    db.getRecipe(id)
        .then(recipeDetail => {
            db.getIngredients(id)
                .then(ingredients => {
                    res.json({ ...recipeDetail, ingredients })
                })
        })
        .catch(err => {
            res.status(500).json({ message: 'Something is broken' })
        })
})

// DELETE /api/v1/recipes/:id
router.delete('/:id', (req, res) => {
    const { id } = req.params
    db.deleteRecipe(id)
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

router.patch('/:id', (req, res) => {
    const { id } = req.params
    const recipe = req.body
    db.editRecipe(id, recipe)
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
})



module.exports = router