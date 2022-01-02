const express = require('express')
const app = express()
const path = require('path')
const bodyParser = require('body-parser')
const logger = require('morgan')

const route=require('./source/routes')
const { conn } = require('./source/database/connectDB')

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '/source/views'))
app.use(express.static(path.join(__dirname, '/public')))

app.use(logger('dev'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

route(app)

app.get('/ngu', async (req, res) => {
  const pool = await conn
  const queryString = 'select * from sanpham'
  await pool.request().query(queryString, (err, data) => {
    console.log('err', err, 'data', data)
  })
  res.render('home')
})

app.listen(3000, () => {
  console.log('Server start on port 3000')
})
