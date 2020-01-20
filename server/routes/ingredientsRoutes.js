const express = require('express')
const router = express.Router()

const db = require('../db/dbIngredients')

// GET /api/v1/ingredients
router.get('/', (req, res) => {
    db.getListIngredients()
        .then(ingredients => {
            res.json(ingredients)
        })
        .catch(err => {
            res.status(500).json({ message: 'Something is broken' })
        })
})

//GET /api/v1/ingredient/:id
router.get('/:id', (req, res) => {
    const { id } = req.params
    db.getIngredient(id)
        .then(ingredient => {
            res.json(ingredient)
        })
        .catch(err => {
            res.status(500).json({ message: 'Something is broken' })
        })
})

router.post('/', (req, res) => {
    const newIngredient = req.body
    db.addIngredient(newIngredient)
        .then((addedIngredients) => {
            res.json(
                addedIngredients[0]
            )
        })
        .catch(err => {
            res.status(500).json({ message: 'Something is broken' })
        })
})

module.exports = router