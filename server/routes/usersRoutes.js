const express = require('express')
const router = express.Router()
const db = require('../db/dbUsers')


// POST /api/v1/users/newUser
router.post('/newUser', (req, res) => {
    const user = req.body
    db.createUser(user)
        .then(id => {
            res.json({ id: id })
        })
        .catch(err => res.status(500).send({ message: 'Server Error' }))

})

router.get('/userExists', (req, res) => {
    const { username } = req.body
    db.userExists(username)
        .then(exists => {
            if(exists){
                res.status(200).send()
            } else {
                res.status(404).send()
            }
        })
})

router.post('/getUserByName', (req,res) => {
    const {username} = req.body
    db.getUserByName(username)
    .then(user_name => {
        res.json(user_name)
    })
})


module.exports = router