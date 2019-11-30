// routes/index.js
import express from 'express'
import Users from '../controllers/user'

const router = express.Router()

router.get('/', (req, res, next) => {
  res.status(200).send('Ти попав в API від Highlander')
})

router.post('/sign-up', Users.signUp)

router.post('/sign-in', Users.signIn)

export default router
