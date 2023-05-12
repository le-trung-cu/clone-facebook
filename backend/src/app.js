const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')
const compression = require('compression')
const { authUser } = require('./middlwares/auth')
require('./dbs/init.mongoose')

console.log('loaded env:', Boolean(process.env.TEST_LOAD_ENV) === true);

const app = express()
app.use(morgan('dev'))
app.use(helmet())
app.use(compression({}))

app.use(express.json({}))
app.use(express.urlencoded({ extended: true }))

app.use((req, res, next) => {
  console.log(req.headers)
  next()
})



app.use('/', require('./routers/users'))

app.get('/profile', authUser, (req, res) => {
  res.json({name: 'user name'})
})

module.exports = app