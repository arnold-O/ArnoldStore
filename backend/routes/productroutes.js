
const express = require('express')

const { getProducts, newProducts, getOneProduct, updateProduct, deleteproduct } = require('../controllers/productcontroller')


const router = express.Router()


router.route('/new').post(newProducts)
router.route('/allproduct').get(getProducts)
router.route('/:id').get(getOneProduct).patch(updateProduct).delete(deleteproduct)
// router.route('/:id')




module.exports = router