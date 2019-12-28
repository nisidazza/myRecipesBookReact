const express = require('express')
const routes = require('./routes')

const server = express()

// Middleware

server.use(express.urlencoded({extended: true}))

server.use(express.json)
// Serve static files
server.use(express.static('public'))

// Routes

server.use('/', routes)


module.exports = server