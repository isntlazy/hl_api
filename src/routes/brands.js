import express from 'express'
import Brands from '../controllers/brand'
import passport from 'passport'

const router = express.Router()

router.get('/',
  passport.authenticate('jwt', { session: false }),
  Brands.index
)

router.get('/:id([0-9]+)',
  passport.authenticate('jwt', { session: false }),
  Brands.getOne
)

router.post('/',
  passport.authenticate('jwt', { session: false }),
  Brands.create
)

router.put('/:id([0-9]+)',
  passport.authenticate('jwt', { session: false }),
  Brands.update
)

router.delete('/:id([0-9]+)',
  passport.authenticate('jwt', { session: false }),
  Brands.delete
)

export default router
