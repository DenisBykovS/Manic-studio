const Card = require('../models/Card')
const errHandler = require('../utils/errorHandler')

module.exports.getAll = async (req, res) => {
  try {
    const card = await Card.find()
    res.status(200).json(card)
  } catch (err) {
    errHandler(res, err)
  }
}

module.exports.create = async (req, res) => {
  const card = new Card({
    name: req.body.name,
    imageSrc: req.file.path,
  })

  try {
    await card.save()
    res.status(201).json(card)
  } catch (err) {
    errHandler(res, err)
  }
}

module.exports.delete = async (req, res) => {
  try {
    await Card.remove({ _id: req.params.id })
    res.status(200).json({ message: 'Фото удаленно' })
  } catch (err) {
    errHandler(res, err)
  }
}

module.exports.edit = async (req, res) => {
  const updated = {
    name: req.body.name,
    imageSrc: req.file.path,
  }
  try {
    const card = await Card.findOneAndUpdate(
      { _id: req.params.id },
      { $set: updated },
      { new: true }
    )
    res.status(200).json(card)
  } catch (err) {
    errHandler(res, err)
  }
}

module.exports.getById = async function (req, res) {
  try {
    const foto = await Card.findById(req.params.id)
    res.status(200).json(foto)
  } catch (error) {
    errHandler(res, error)
  }
}
