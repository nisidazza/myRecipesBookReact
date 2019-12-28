const express = require('express')

const db = require('./db/db')

const router = express.Router()

router.get('/recipes', (req, res) => {
    db.getListRecipes()
        .then(recipes => {
            //console.log(recipes)
            res.json(recipes)
        })
        .catch(err => {
            res.status(500).json({message: 'Something is broken'})
        })
})


router.get('/ingredients', (req,res) => {
    db.getListIngredients()
    .then(ingredients => {
        res.json(ingredients)
    })
    .catch(err => {
        res.status(500).json({message: 'Something is broken'})
    })
})

module.exports = router