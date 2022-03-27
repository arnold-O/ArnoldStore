const express = require('express')

const { registeruser, loginuser, logoutUser } = require('../controllers/authcontroller')


const router = express.Router()


router.route('/create').post(registeruser)
router.route('/login').post(loginuser)
router.route('/logout').get(logoutUser)

// router.route('/:id')u




module.exports = router