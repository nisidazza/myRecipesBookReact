const express = require('express')
const { applyAuthRoutes } = require('authenticare/server')

const { userExists, getUserByName, createUser } = require('../db/dbUsers') 

const router = express.Router()

applyAuthRoutes(router, {userExists, getUserByName,createUser})

module.exports = router