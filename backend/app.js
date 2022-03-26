const fs = require("fs");
const express = require("express");
const productRoutes = require('./routes/productroutes')


const app = express();

app.use(express.json())


// mouting Multiple router
app.use('/api/products', productRoutes)

module.exports = app