const express = require('express')
const router = express.Router()

const db = require('../db/dbIngredients')

// DELETE /api/v1/ingredients/:id
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

//PATCH /api/v1/ingredient/:id
router.patch('/:id', (req, res) => {
    let ingredient = req.body
    ingredient.name = ingredient.name.trim() 
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

// POST /api/v1/ingredients
router.post('/', (req,res) => {
    let newIngredient = req.body;
    newIngredient.name = newIngredient.name.trim()
    db.addIngredient(newIngredient)
    .then(hasBeenAdded => {
        if(hasBeenAdded) {
            res.status(201).json(req.body)
        } else {
            res.sendStatus(404)
        }
    })
    .catch(err => {
        res.status(409).json({message: 'Conflict. Duplicate data'})
        console.log(err)
    })
})



module.exports = router