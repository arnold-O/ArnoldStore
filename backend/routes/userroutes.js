const express = require('express')

const { registeruser, loginuser, logoutUser, forgotPassword, resetpassword } = require('../controllers/authcontroller')


const router = express.Router()

router.route('/forgotpassword').post(forgotPassword)

router.route('/resetpassword/:token').patch(resetpassword )



router.route('/create').post(registeruser)
router.route('/login').post(loginuser)
router.route('/logout').get(logoutUser)

// router.route('/:id')u




module.exports = router