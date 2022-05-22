const express = require('express')
const controler = require('../controlers/message-cont')
const router = express.Router()

router.get('/', controler.getAll)
router.post('/', controler.create)
router.delete('/:id', controler.delete)

module.exports = router
