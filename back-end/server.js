require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')
mongoose.connect(process.env.url_db)
    .then(() => {
        console.log('Conectei ao base de dados')
        app.emit('pronto')
    })
    .catch(e => console.log(e))

const session = require('express-session')
const MongoStore = require('connect-mongo')
const flash = require('connect-flash')

const route = require('./routes')
const path = require('path')
// const {} = require('./src/middlewares/middleware')
// const helmet = require('helmet')
const csurf = require('csurf')

app.use(express.urlencoded({extended: true}))
app.use(express.static(path.resolve(__dirname, '..','public')))
console.log("Servindo arquivos estáticos de:", path.resolve(__dirname, '../public'));


const sessionOptions = session({
    secret: 'Testando',
    store: MongoStore.create({mongoUrl: process.env.url_db}),
    resave: false,
    saveUninitialized: false,
    cookie: {
        // 3 dias em milessimos de sgundos
        maxAge: 1000 * 60 * 60 * 24 * 3,
        httpOnly: true
    }
})

app.use(sessionOptions)
app.use(csurf())

app.set('views', path.resolve(__dirname, 'src', 'views'))
app.set('view engine', 'ejs')

app.use(flash())
// app.use(helmet())

// Colocar Middleware

app.use(route)

app.on('pronto', () => {
    app.listen(3000, () => {
        console.log('Acesse ao terminal: http://localhost:3000')
        console.log('Servidor inicializado com sucesso')
    })
})
