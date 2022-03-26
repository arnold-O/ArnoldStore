const fs = require("fs");
const express = require("express");
const productRoutes = require('./routes/productroutes')

const errorMiddleware = require('./middleware/error');
const ErrorHandler = require("./utils/errorhandler");


const app = express();

app.use(express.json())


// mouting Multiple router
app.use('/api/products', productRoutes)

app.all('*', (req, res, next)=>{

    next(new ErrorHandler(`cant find ${req.originalUrl} on this server`, 404))
  })


app.use(errorMiddleware)

module.exports = app