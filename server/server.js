const express = require('express')
const server = express()

const recipesRoutes = require('./routes/recipesRoutes')
const recipesSearchRoutes = require('./routes/recipesSearchRoutes')
const ingredientsRoutes = require('./routes/ingredientsRoutes')
const recipesIngredientsRoutes = require('./routes/recipesIngredientsRoutes')
const authRoutes = require('./routes/auth')
const passResetRoutes = require('./routes/passResetRoutes')


// Middleware
server.use(express.urlencoded({ extended: true }))

server.use(express.json())
// Serve static files
server.use(express.static('public'))

server.use('/api/v1/recipes', recipesRoutes)
server.use('/api/v1/recipes-search', recipesSearchRoutes)
server.use('/api/v1/ingredients', ingredientsRoutes)
server.use('/api/v1/recipes', recipesIngredientsRoutes)
server.use('/api/v1', authRoutes)
server.use('/api/v1', passResetRoutes)

module.exports = server