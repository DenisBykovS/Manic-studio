const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const passport = require('passport')
const morgan = require('morgan')
const mongoose = require('mongoose')
const keys = require('./config/keys')
const path = require('path')

mongoose
  .connect(keys.mongoURI)
  .then(() => {
    console.log('MONGO DB CONECTED')
  })
  .catch((err) => console.log(err))

const authRoutes = require('./routes/auth-route')
const messageRoutes = require('./routes/message-route')
const portfolioRoutes = require('./routes/portfolio-route')

app.use(passport.initialize())
require('./middleware/passport')(passport)
app.use(require('cors')())
app.use(morgan('dev'))
app.use('/uploads', express.static('uploads'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use('/api/auth', authRoutes)
app.use('/api/message', messageRoutes)
app.use('/api/portfolio', portfolioRoutes)

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('MS-client/dist'))

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'MS-client', 'dist', 'index.html'))
  })
}

module.exports = app
