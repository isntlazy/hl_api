'use strict'
module.exports = (sequelize, DataTypes) => {
  const Brand = sequelize.define('Brand', {
    name: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: 'Будь ласка вкажіть назву бренду'
      },
      unique: {
        args: true,
        msg: 'Бренд з таким іменем уже є в базі даних'
      }
    },
    imageUrl: DataTypes.STRING,
    description: DataTypes.STRING
  }, {})
  Brand.associate = function (models) {
    // associations can be defined here
  }
  return Brand
}
