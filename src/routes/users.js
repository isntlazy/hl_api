// routes/index.js
import express from 'express'
import Users from '../controllers/user'

const router = express.Router()

router.get('/', (req, res, next) => {
  res.status(200).send('Ти попав в API від Highlander')
})

router.post('/', Users.signUp)

export default router
