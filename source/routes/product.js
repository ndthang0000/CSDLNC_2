const express = require('express')
const {multer}=require('../middleware')
const router = express.Router()

const { ProductController } = require('../controllers')

router.get('/detail/:id', ProductController.detail)
router.get('/category', ProductController.category)
router.post('/category', ProductController.saveCategory)
router.get('/add', ProductController.addProduct)
router.post('/add',multer.single('image') ,ProductController.saveProduct)
router.get('/:id', ProductController.home)
router.get('/', ProductController.home)

module.exports = router
