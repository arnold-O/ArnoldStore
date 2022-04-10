const express = require("express");

const {
  registeruser,
  loginuser,
  logoutUser,
  forgotPassword,
  resetpassword,
  getUserProfile,
  updatePassword,
  updateprofile,
  getAllusers,
} = require("../controllers/authcontroller");

const { isAuthenticatedUser, authorizedRoles } = require("../middleware/authOrNot");

const router = express.Router();

router.route("/forgotpassword").post(forgotPassword);

router.route("/resetpassword/:token").patch(resetpassword);

router.route("/userprofile").get(isAuthenticatedUser, getUserProfile);

router.route("/updateprofile").post(isAuthenticatedUser, updateprofile);

router.route("/updatepassword").patch(isAuthenticatedUser, updatePassword);

router.route("/create").post(registeruser);
router.route("/login").post(loginuser);
router.route("/logout").get(logoutUser);


router.route("/getalluser/admin").get(isAuthenticatedUser, authorizedRoles("admin"), getAllusers)

// router.route('/:id')

module.exports = router;
