const User = require('../models/Admin')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const keys = require('../config/keys')
const errHandler = require('../utils/errorHandler')

module.exports.login = async (req, res) => {
  const candidate = await User.findOne({ login: req.body.login })
  if (candidate) {
    const pass = req.body.password
    const passResult = bcrypt.compareSync(pass, candidate.password)
    if (passResult) {
      const token = jwt.sign(
        {
          login: candidate.login,
          userId: candidate._id,
        },
        keys.jwt,
        { expiresIn: 60 * 60 * 12 }
      )
      res.status(200).json({
        token: `Bearer ${token}`,
      })
    } else {
      res.status(401).json({
        message: 'Пароль неверный',
      })
    }
  } else {
    res.status(404).json({
      message: 'login не найден',
    })
  }
}

module.exports.register = async (req, res) => {
  const candidate = await User.findOne({ login: req.body.login })
  if (candidate) {
    res.status(409).json({
      message: 'login занят',
    })
  } else {
    const salt = await bcrypt.genSalt(10)
    const password = req.body.password
    const user = new User({
      login: req.body.login,
      password: bcrypt.hashSync(password, salt),
    })
    try {
      await user.save()
      res.status(201).json(user)
    } catch (err) {
      errHandler(res, err)
    }
  }
}
