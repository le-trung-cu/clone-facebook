const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/shopDev')
  .then(_ => console.log('Connected Mongodb Success'))
  .catch(err => console.log('Error connect! ', err))

module.exports = mongoose