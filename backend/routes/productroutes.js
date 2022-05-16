const express = require("express");

const {
  getProducts,
  newProducts,
  getOneProduct,
  updateProduct,
  deleteproduct,
  createProductReview,
  getAllReviews,
} = require("../controllers/productcontroller");
const {
  isAuthenticatedUser,
  authorizedRoles,
} = require("../middleware/authOrNot");

const router = express.Router();

router
  .route("/new")
  .post(isAuthenticatedUser, authorizedRoles("admin"), newProducts);
router.route("/allproduct").get( getProducts);
router.route("/singleproduct/:id").get(getOneProduct);
router
  .route("/update/:id")
  .patch(isAuthenticatedUser, authorizedRoles("admin"), updateProduct);
router
  .route("/deleteprodct/:id")
  .delete(isAuthenticatedUser, authorizedRoles("admin"), deleteproduct);
router.route('/review').put(isAuthenticatedUser, authorizedRoles('admin'), createProductReview)

router.route('/allreview').get(isAuthenticatedUser, authorizedRoles('admin'), getAllReviews)


module.exports = router;
