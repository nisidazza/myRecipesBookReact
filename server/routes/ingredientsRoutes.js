const express = require('express')
const router = express.Router()

const db = require('../db/dbIngredients')

router.delete('/:id', (req, res) => {
    const { id } = req.params
    db.deleteIngredient(id)
        .then(hasBeenDeleted => {
            if (hasBeenDeleted) {
                res.json({ message: `ingredient with id ${id} has been deleted` })
            } else {
                res.sendStatus(404)
            }
        })
        .catch(err => {
            res.status(500).json({ message: 'Something is broken' })
            console.log(err)
        })
})

// GET /api/v1/ingredients
router.get('/', (req, res) => {
    db.getListIngredients()
        .then(ingredients => {
            res.json(ingredients)
        })
        .catch(err => {
            res.status(500).json({ message: 'Something is broken' })
            console.log(err)
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
            console.log(err)
        })
})

router.patch('/:id', (req, res) => {
    const ingredient = req.body
    const { id } = req.params
    db.updateIngredient(id, ingredient)
        .then((updatedIngredient) => {
            res.json(updatedIngredient[0])
        })
        .catch(err => {
            res.status(500).json({ message: 'Something is broken' })
            console.log(err)
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
            console.log(err)
        })
})



module.exports = router