const fs = require("fs");
const express = require("express");
const productRoutes = require("./routes/productroutes");
const userRoutes = require("./routes/userroutes");
const orderRoutes = require("./routes/order");

const errorMiddleware = require("./middleware/error");
const ErrorHandler = require("./utils/errorhandler");

const cookieParser = require("cookie-parser");

const app = express();

app.use(express.json());
app.use(cookieParser());

// mouting Multiple router
app.use("/api/products", productRoutes);
app.use("/api/user", userRoutes);
app.use("/api/order", orderRoutes);

app.all("*", (req, res, next) => {
  next(new ErrorHandler(`cant find ${req.originalUrl} on this server`, 404));
});

app.use(errorMiddleware);

module.exports = app;
