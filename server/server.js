const express = require('express')
const recipesRoutes = require('./routes/recipesRoutes')
const ingredientsRoutes = require('./routes/ingredientsRoutes')
const recipesIngredientsRoutes = require('./routes/recipesIngredientsRoutes')
const authRoutes = require('./routes/auth')
const server = express()

// Middleware
server.use(express.urlencoded({ extended: true }))

server.use(express.json())
// Serve static files
server.use(express.static('public'))

server.use('/api/v1/recipes', recipesRoutes)
server.use('/api/v1/ingredients', ingredientsRoutes)
server.use('/api/v1/recipes/:recipe_id/ingredients', recipesIngredientsRoutes)
server.use('/api/v1', authRoutes)

module.exports = server