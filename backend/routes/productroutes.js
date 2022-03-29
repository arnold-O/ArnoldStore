
const express = require('express')

const { getProducts, newProducts, getOneProduct, updateProduct, deleteproduct } = require('../controllers/productcontroller')
const { isAuthenticatedUser, authorizedRoles } = require('../middleware/authOrNot')


const router = express.Router()


router.route('/new').post(isAuthenticatedUser,  authorizedRoles('user'),  newProducts)
router.route('/allproduct').get(isAuthenticatedUser, getProducts)
router.route('/singleproduct/:id').get(getOneProduct)
router.route('/update/:id').patch(isAuthenticatedUser, authorizedRoles('admin'), updateProduct)
router.route('deleteprodct/:id').delete(isAuthenticatedUser, authorizedRoles('admin'), deleteproduct)
// router.route('/:id')u




module.exports = router