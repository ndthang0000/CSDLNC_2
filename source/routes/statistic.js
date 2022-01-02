const express = require('express')
const router = express.Router()

const { StatisticController } = require('../controllers')

router.get('/product', StatisticController.product)
router.get('/category', StatisticController.category)
router.get('/sales', StatisticController.sales)

module.exports = router
