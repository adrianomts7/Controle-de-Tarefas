const express = require('express')
const route = express.Router()

const registerControllers = require('./src/controllers/registerControllers')
const loginControllers = require('./src/controllers/loginControllers')

// Register 
route.get('/register', registerControllers.index)
route.post('/register', registerControllers.register)

// Login
route.get('/login', loginControllers.index)
route.post('/login/login', loginControllers.login)
route.get('/login/logout', loginControllers.logout)

module.exports = route