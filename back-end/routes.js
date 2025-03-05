const express = require('express')
const route = express.Router()

const registerControllers = require('./src/controllers/registerControllers')
const loginControllers = require('./src/controllers/loginControllers')

// Register 
route.get('/register', registerControllers.index)

// Login
route.get('/login', loginControllers.index)

module.exports = route