import { Strategy, ExtractJwt } from 'passport-jwt'
import model from './db/models'
const { User } = model

const secret = process.env.SECRET || 'some other secret as default'
const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: secret
}

module.exports = passport => {
  passport.use(
    new Strategy(opts, (payload, done) => {
      User.findByPk(payload.id)
        .then(user => {
          if (user) {
            return done(null, {
              id: user.id,
              name: user.name,
              email: user.email
            })
          }
          return done(null, false)
        }).catch(err => console.error(err))
    })
  )
}
