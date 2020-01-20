const express = require('express')
const router = express.Router()

const db = require('../db/dbRecipesIngredients')

router.get('/:ingredientId', (req, res) => {
    const { recipeId } = req.params
    const { ingredientId } = req.params
    const quantity = req.body.quantity
    const name = req.body.name
    db.getIngredientInRecipe(recipeId, ingredientId, quantity, name)
        .then(ingredient => {
            if (ingredient.length > 0) {
                res.status(200).json(ingredient[0])
            } else {
                res.sendStatus(404)
            }
        })
        .catch(err => {
            res.status(500).json({ message: 'Something is broken' })
        })
})

router.delete('/:ingredient_id', (req, res) => {
    const { recipe_id } = req.params
    const { ingredient_id } = req.params
    db.deleteIngredientFromRecipe(recipe_id, ingredient_id)
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



router.patch('/:ingredient_id', (req, res) => {
    const { recipe_id } = req.params
    const { ingredient_id } = req.params
    const quantity = req.body.quantity
    if (quantity == null || quantity == undefined) {
        res.status(400).json({ message: "'quantity' is required" })
        return
    }
    db.updateIngredientInRecipe(recipe_id, ingredient_id, quantity)
        .then(hasBeenUpdated => {
            if (hasBeenUpdated) {
                res.status(200).json(req.body)
            } else {
                res.sendStatus(404)
            }
        }).catch(err => {
            res.status(500).json({ message: 'Something is broken' })
        })
})



router.post('/:ingredient_id', (req, res) => {
    const { recipe_id } = req.params
    const { ingredient_id } = req.params
    const quantity = req.body.quantity
    db.addIngredientToRecipe(recipe_id, ingredient_id, quantity)
        .then(hasBeenAdded => {
            if (hasBeenAdded) {
                res.status(201).json(req.body)
            } else {
                res.sendStatus(404)
            }
        }).catch(err => {
            if (err.message == 'INGREDIENT_CONFLICT') {
                res.status(409).json({ message: `Ingredient ${ingredient_id} already in recipe ${recipe_id}` })
            } else {
                res.status(500).json({ message: 'Something is broken' })
            }
        })
})

module.exports = router