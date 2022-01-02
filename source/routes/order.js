const express = require('express')
const router = express.Router()

const { OrderController } = require('../controllers')

router.get('/date/:date', OrderController.date)
router.get('/accept/:id', OrderController.accept)
router.get('/lastest', OrderController.lastest)
router.get('/', OrderController.home)

module.exports = router
