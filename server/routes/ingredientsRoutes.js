const express = require('express')
const router = express.Router()

const db = require('../db/db')

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

module.exports = router