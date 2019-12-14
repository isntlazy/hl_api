import express from 'express'
import path from 'path'
import logger from 'morgan'
import bodyParser from 'body-parser'
import passport from 'passport'

import usersRouter from './routes/users'
import brandsRouter from './routes/brands'

const app = express()

app.use(passport.initialize())
require('./passport')(passport)
app.use(logger('dev')) // log requests to the console
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json())
app.use(express.static(path.join(__dirname, '../public')))

app.use('/users', usersRouter)
app.use('/brands', brandsRouter)

export default app
