import model from '../db/models'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

const secret = process.env.SECRET || 'some other secret as default'
const { User } = model

class Users {
  static signUp (req, res) {
    const defaultRole = 'manager'
    const { name, email, password } = req.body
    const newUser = new User({ name, email, password, role: defaultRole })
    bcrypt.genSalt(10, (err, salt) => {
      if (err) { throw err }
      bcrypt.hash(newUser.password, salt,
        (err, hash) => {
          if (err) { throw err }
          newUser.password = hash
          newUser.save()
            .then(user => {
              delete user.dataValues.password
              return res.json(user)
            })
            .catch(err => res.status(400).json(err))
        })
    })
  }

  static signIn (req, res) {
    const { email, password } = req.body
    const errors = {}
    User.findOne({ where: { email } })
      .then(user => {
        if (!user) {
          errors.email = 'Даний Email не зареєстровано в системі'
          return res.status(404).json({ success: false, errors })
        }
        bcrypt.compare(password, user.password)
          .then(isMatch => {
            if (isMatch) {
              const payload = {
                id: user.id,
                email: user.email
              }
              jwt.sign(payload, secret, { expiresIn: 36000 },
                (err, token) => {
                  if (err) {
                    res.status(500)
                      .json({
                        error: 'Помилка створення токену',
                        raw: err
                      })
                  }
                  res.json({
                    success: true,
                    token: `${token}`
                  })
                })
            } else {
              errors.password = 'Неправильний пароль'
              res.status(400).json({ success: false, errors })
            }
          })
      })
  }
}

export default Users
