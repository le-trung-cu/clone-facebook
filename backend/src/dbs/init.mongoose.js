const mongoose = require("mongoose");
const { db: { host, port, name } } = require('../configs/config.mongodb')
class Database {
  static instance

  constructor() {
    mongoose.set('debug', true)
    mongoose.set('debug', { color: true })

    mongoose.connect(`${host}:${port}/${name}`)
      .then(_ => console.log('Connected Mongodb Success'))
      .catch(err => console.log('Error connect! ', err))
  }

  static getInstance() {
    if (!Database.instance) {
      Database.instance = new Database()
    }
    return Database.instance
  }
}

const instanceMongoDb = Database.getInstance()

module.exports = instanceMongoDb