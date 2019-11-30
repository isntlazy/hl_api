import express from 'express'
import path from 'path'
import logger from 'morgan'
import bodyParser from 'body-parser'
import usersRouter from './routes/users'

const app = express()

app.use(logger('dev')) // log requests to the console
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json())
app.use(express.static(path.join(__dirname, '../public')))

app.use('/users', usersRouter)

export default app
