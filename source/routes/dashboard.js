const express = require('express')
const router = express.Router()

const { DasdboardController } = require('../controllers')

router.get('/', DasdboardController.home)

module.exports = router
