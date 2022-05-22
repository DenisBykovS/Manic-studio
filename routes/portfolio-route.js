const express = require('express')
const controler = require('../controlers/portfolio-cont')
const passport = require('passport')
const upload = require('../middleware/upload')
const router = express.Router()

// router.get(
//   '/',
//   passport.authenticate('jwt', { session: false }),
//   controler.getAll
// )
router.get('/', controler.getAll)
router.get('/:id', controler.getById)
router.post('/', upload.single('image'), controler.create)
router.delete('/:id', controler.delete)
router.patch('/:id', upload.single('image'), controler.edit)

module.exports = router
