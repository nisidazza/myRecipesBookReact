const express = require('express')
const routes = require('./routes')
const server = express()

// Middleware
server.use(express.urlencoded({extended: true}))

server.use(express.json())
// Serve static files
server.use(express.static('public'))

server.use('/api/v1', routes)



module.exports = server