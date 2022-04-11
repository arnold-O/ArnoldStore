const express = require("express");
const { newOrder } = require("../controllers/orderController");
const router = express.Router();





router.route('/oredr').post(newOrder)