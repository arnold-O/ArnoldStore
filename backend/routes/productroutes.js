
const express = require('express')

const { getProducts, newProducts, getOneProduct, updateProduct, deleteproduct } = require('../controllers/productcontroller')
const { isAuthenticatedUser, authorizedRoles } = require('../middleware/authOrNot')


const router = express.Router()


router.route('/new').post(isAuthenticatedUser, newProducts)
router.route('/allproduct').get(isAuthenticatedUser, authorizedRoles('user'),  getProducts)
router.route('/singleproduct/:id').get(getOneProduct)
router.route('/update/:id').patch(isAuthenticatedUser, updateProduct)
router.route('deleteprodct/:id').delete(isAuthenticatedUser, deleteproduct)
// router.route('/:id')u




module.exports = router