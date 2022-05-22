const Messages = require('../models/Message')
const errHandler = require('../utils/errorHandler')

module.exports.getAll = async (req, res) => {
  try {
    const messages = await Messages.find()
    res.status(200).json(messages)
  } catch (err) {
    errHandler(res, err)
  }
}
module.exports.create = async (req, res) => {
  const message = await new Messages({
    name: req.body.name,
    phone: req.body.phone,
    dateSing: req.body.dateSing,
    hours: req.body.hours,
    text: req.body.text,
  })
  try {
    await message.save()
    res.status(201).json(message)
  } catch (err) {
    errHandler(res, err)
  }
}

module.exports.delete = async (req, res) => {
  try {
    await Messages.remove({ _id: req.params.id })
    res.status(200).json({ message: 'Сообщение удаленно' })
  } catch (err) {
    errHandler(res, err)
  }
}
