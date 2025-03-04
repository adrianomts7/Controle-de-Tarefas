const express = require('express')
const route = express.Router()
const loginControllers = require('./src/controllers/loginControllers')

route.get('/login', loginControllers.index)

module.exports = route