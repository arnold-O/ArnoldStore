
const express = require('express')

const { getProducts, newProducts, getOneProduct, updateProduct, deleteproduct } = require('../controllers/productcontroller')


const router = express.Router()


router.route('/new').post(newProducts)
router.route('/allproduct').get(getProducts)
router.route('/singleproduct/:id').get(getOneProduct)
router.route('/update/:id').patch(updateProduct)
router.route('deleteprodct/:id').delete(deleteproduct)
// router.route('/:id')u




module.exports = router