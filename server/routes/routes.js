const express = require('express')
const router = express.Router()

const db = require('../db/db')


//GET /api/v1/recipes
router.get('/recipes', (req, res) => {
    db.getListRecipes()
        .then(recipes => {
            //console.log(recipes)
            res.json(recipes)
        })
        .catch(err => {
            res.status(500).json({ message: 'Something is broken' })
        })
})

// GET /api/v1/ingredients
router.get('/ingredients', (req, res) => {
    db.getListIngredients()
        .then(ingredients => {
            res.json(ingredients)
        })
        .catch(err => {
            res.status(500).json({ message: 'Something is broken' })
        })
})

// GET /api/v1/recipes/:id
router.get('/recipes/:id', (req, res) => {
    let { id } = req.params
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

// DELETE /api/v1/recipes/delete
router.delete('/recipes/:id', (req, res) => {
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

router.patch('/recipes/:id', (req, res) => {
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

router.delete('/recipes/:recipe_id/ingredients/:ingredient_id', (req, res) => {
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

router.patch('/recipes/:recipe_id/ingredients/:ingredient_id', (req, res) => {
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

router.delete('/recipes/:recipe_id/ingredients/:ingredient_id', (req, res) => {
    const { recipe_id } = req.params
    const { ingredient_id } = req.params
    db.deleteIngredientFromRecipe(recipe_id, ingredient_id)
        .then(hasBeenDeleted => {
            if (hasBeenDeleted) {
                res.status(204)
            } else {
                res.status(404)
            }
        }).catch(err => {
            res.status(500).json({ message: 'Something is broken' })
        })
})

router.post('/recipes/:recipe_id/ingredients/:ingredient_id', (req, res) => {
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

router.get('/recipes/:recipeId/ingredients/:ingredientId', (req, res) => {
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

router.get('/recipes/view/:id', (req, res) => {
    let { id } = req.params
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

module.exports = router