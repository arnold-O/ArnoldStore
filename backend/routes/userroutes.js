const express = require("express");

const {
  registeruser,
  loginuser,
  logoutUser,
  forgotPassword,
  resetpassword,
  getUserProfile,
  updatePassword,
} = require("../controllers/authcontroller");

const { isAuthenticatedUser } = require("../middleware/authOrNot");

const router = express.Router();

router.route("/forgotpassword").post(forgotPassword);

router.route("/resetpassword/:token").patch(resetpassword);

router.route("/userprofile").get(isAuthenticatedUser, getUserProfile);

router.route("/updatepassword").patch(isAuthenticatedUser, updatePassword);

router.route("/create").post(registeruser);
router.route("/login").post(loginuser);
router.route("/logout").get(logoutUser);

// router.route('/:id')u

module.exports = router;
