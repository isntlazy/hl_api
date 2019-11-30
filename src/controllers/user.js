import model from '../db/models'

const { User } = model

class Users {
  static signUp (req, res) {
    const { name, email, password, role } = req.body
    return User
      .create({
        name,
        email,
        password,
        role
      })
      .then(userData => res.status(201)
        .send({
          success: true,
          message: 'Новий користувач успішно створений',
          userData
        })
      )
  }
}

export default Users
