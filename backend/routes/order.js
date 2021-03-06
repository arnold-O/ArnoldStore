const express = require("express");
const { newOrder, getMyOrder, getSingleOrder, getAllOrders, updateOrders, deleteOrder } = require("../controllers/orderController");
const { isAuthenticatedUser, authorizedRoles } = require("../middleware/authOrNot");
const router = express.Router();




router.route('/').post(isAuthenticatedUser, newOrder)

router.route('/myorder').get(isAuthenticatedUser, getMyOrder)

router.route('/singleorder/:id').get(isAuthenticatedUser, getSingleOrder)

router.route('/allorders').get(isAuthenticatedUser,   getAllOrders)

router.route('/updateorder/:id').put(isAuthenticatedUser, updateOrders)

router.route('/deleteorder/:id').delete(isAuthenticatedUser, deleteOrder)



module.exports = router