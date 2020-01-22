const express = require('express')
const router = express.Router()

const dbUsersRecipes = require('../db/dbUsersRecipes')


//GET /api/v1/recipes/user/:id

router.get('/:id/recipes', (req, res) => {
    const userId = req.params.id
    dbUsersRecipes.getUserRecipes(userId)
        .then(userRecipes => {
            res.json(userRecipes)
        })
        .catch(err => {
            res.status(500).json({ message: 'Something is broken' })
        })
})


//GET /api/v1/recipes/user/:id/private

router.get('/:id/recipes/private', (req, res) => {
    const userId = req.params.id
    dbUsersRecipes.getUserPrivateRecipes(userId)
        .then(privateRecipes => {
            res.json(privateRecipes)
        })
        .catch(err => {
            res.status(500).json({ message: 'Something is broken' })
        })
})




module.exports = router