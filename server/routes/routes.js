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

// GET /api/v1/recipe/:id
router.get('/recipe/:id', (req, res) => {
    let { id } = req.params
    db.getRecipe(id)
        .then(recipeDetail => {
            db.getIngredients(id) 
            .then(recipeIngredients => {
                res.json({recipeDetail, recipeIngredients})
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
            if(hasBeenDeleted) {
                res.sendStatus(204)
            } else {
                res.sendStatus(404)
            }
        })
        .catch(err => {
            res.status(500).json({ message: 'Something is broken' })
        })
})

// router.patch('/edit/:id', (req,res) => {
//     db.
// })



module.exports = router