const DashBoardRoute = require('./dashboard')
const OrderRoute = require('./order')
const ProductRoute=require('./product')
const StatisticRoute=require('./statistic')

function route (app) {
  app.use('/',DashBoardRoute)
  app.use('/orders',OrderRoute)
  app.use('/product',ProductRoute)
  app.use('/statistic',StatisticRoute)
}
module.exports = route
