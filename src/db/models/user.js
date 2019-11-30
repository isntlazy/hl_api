'use strict'
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: 'Будь ласка вкажіть ваше повне ім\'я'
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: 'Будь ласка вкажіть ваш Email'
      },
      unique: {
        args: true,
        msg: 'Даний Email уже є в базі даних'
      },
      validate: {
        isEmail: {
          args: true,
          msg: 'Будь ласка вкажіть коректний Email'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: 'Будь ласка вкажіть пароль'
      },
      validate: {
        isNotShort: (value) => {
          if (value.length < 8) {
            throw new Error('Пароль повинен містити мінімум 8 символів')
          }
        }
      }
    },
    role: DataTypes.STRING
  }, {})
  User.associate = (models) => {
    // associations can be defined here
  }
  return User
}
