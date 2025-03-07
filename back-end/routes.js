const express = require('express')
const route = express.Router()

const homeControllers = require('./src/controllers/homeControllers')
const registerControllers = require('./src/controllers/registerControllers')
const loginControllers = require('./src/controllers/loginControllers')
const tarefaControllers = require('./src/controllers/tarefaControllers')
const { loginRequired } = require('./src/middlewares/middleware')

//Home
route.get('/', homeControllers.index)

// Register 
route.get('/register', registerControllers.index)
route.post('/register', registerControllers.register)

// Login
route.get('/login', loginControllers.index)
route.post('/login/login', loginControllers.login)
route.get('/login/logout', loginControllers.logout)

// Tarefa
route.get('/tarefa', loginRequired,tarefaControllers.index)
route.post('/tarefa', loginRequired, tarefaControllers.register)
route.get('/tarefa/index/:id', loginRequired, tarefaControllers.editIndex)
route.post('/tarefa/edit/:id', loginRequired, tarefaControllers.edit)
route.get('/tarefa/delete/:id', loginRequired, tarefaControllers.delete)
route.get('/tarefa/dados/:id', loginRequired, tarefaControllers.dados)

module.exports = route