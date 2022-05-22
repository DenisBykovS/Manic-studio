const mongoose = require('mongoose')
const Schema = mongoose.Schema

const messageSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  dateSing: {
    type: String,
    required: true,
  },
  hours: {
    type: String,
    required: true,
  },
  text: {
    type: String,
  },
})

module.exports = mongoose.model('messages', messageSchema)
