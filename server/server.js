const express = require('express')
const routes = require('./routes/routes')
const usersRoutes = require('./routes/usersRoutes')
const authRoutes = require('./routes/auth')
const server = express()

// Middleware
server.use(express.urlencoded({extended: true}))

server.use(express.json())
// Serve static files
server.use(express.static('public'))

server.use('/api/v1', routes)
server.use('/api/v1', authRoutes)
server.use('/api/v1/users', usersRoutes)



module.exports = server