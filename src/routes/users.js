// routes/index.js
import express from 'express'
import Users from '../controllers/user'
import passport from 'passport'

const router = express.Router()

router.get('/', (req, res, next) => {
  res.status(200).send('Ти попав в API від Highlander')
})

router.post('/sign-up', Users.signUp)

router.post('/sign-in', Users.signIn)

router.get('/test-jwt', passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.send('Ти маєш потрапити сюди лише по правильному токену')
  })

export default router
