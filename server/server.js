const express = require('express')
const recipesRoutes = require('./routes/recipesRoutes')
const ingredientsRoutes = require('./routes/ingredientsRoutes')
const usersRoutes = require('./routes/usersRoutes')
const authRoutes = require('./routes/auth')
const server = express()

// Middleware
server.use(express.urlencoded({extended: true}))

server.use(express.json())
// Serve static files
server.use(express.static('public'))

server.use('/api/v1', recipesRoutes)
server.use('/api/v1', ingredientsRoutes)
server.use('/api/v1', authRoutes)
server.use('/api/v1/users', usersRoutes)

module.exports = server