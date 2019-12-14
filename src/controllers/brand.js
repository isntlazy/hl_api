import model from '../db/models'

const { Brand } = model

class Brands {
  // Отримуємо список усіх брендів
  static index (req, res) {
    Brand.findAll().then((brands) => {
      return res.status(200).json({ success: true, brands })
    })
  }

  // Отримуємо конкретний бренд по id
  static getOne (req, res) {
    const id = req.params.id
    Brand.findByPk(id).then((brand) => {
      return res.status(200).json({ success: true, brand })
    })
  }

  // Створюємо новий бренд
  static create (req, res) {
    const { name, description, imageUrl } = req.body
    const newBrand = new Brand({ name, imageUrl, description })
    newBrand.save()
      .then(brand => {
        return res.status(201).json({ success: true, brand })
      })
      .catch(err => res.status(400).json(err))
  }

  // Редагуємо існуючий бренд
  static update (req, res) {
    const id = req.params.id
    const { name, description, imageUrl } = req.body
    Brand.update(
      { name, description, imageUrl },
      { returning: true, where: { id: id }, limit: 1 }
    )
      .then(brand => {
        return res.status(200).json({ success: true, brand: brand[1] })
      })
      .catch(err => res.status(400).json(err))
  }

  // Видаляємо бренд
  static delete (req, res) {
    const id = req.params.id
    Brand.destroy({ where: { id: id }, limit: 1 })
      .then(() => {
        return res.status(200).json({ success: true, data: null })
      })
      .catch(err => res.status(400).json(err))
  }

  // Завантажуємо та ресайзимо зображення бренду
  static loadImage () {
  }
}

export default Brands
