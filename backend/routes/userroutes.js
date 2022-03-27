const express = require('express')

const { registeruser } = require('../controllers/authcontroller')


const router = express.Router()


router.route('/create').post(registeruser)

// router.route('/:id')u




module.exports = router