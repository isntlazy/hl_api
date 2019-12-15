import express from 'express'
import path from 'path'
import logger from 'morgan'
import bodyParser from 'body-parser'
import passport from 'passport'

import usersRouter from './routes/users'
import brandsRouter from './routes/brands'

const app = express()

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:8080')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

app.use(passport.initialize())
require('./passport')(passport)
app.use(logger('dev')) // log requests to the console
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json())
app.use(express.static(path.join(__dirname, '../public')))

// app.options('*', cors())
app.use('/users', usersRouter)
app.use('/brands', brandsRouter)

export default app
