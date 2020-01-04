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
        .then(recipe => {
            res.json(recipe)
        })
        .catch(err => {
            res.status(500).json({ message: 'Something is broken' })
        })
})

module.exports = router