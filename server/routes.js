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




module.exports = router