const ErrorHandler = require("../utils/errorhandler");

const handleCAstDBError = (err) => {
  const message = `resource not found, invalid ${err.path}`;
  return new ErrorHandler(message, 400);
};
const handleValidationError = (err) => {
  const message = Object.values(err.errors).map((value) => value.message);
  return new ErrorHandler(message, 400);
};
const handleDuplicateError = (err) => {
  const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
  return new ErrorHandler(message, 400);
};
const handleJsonwebtokenError = (err) => {
  const message = ` json web Token is invalid ! try Agian!!!!`;
  return new ErrorHandler(message, 400);
};
const handleTokenExpiredError = (err) => {
  const message = `json web Token has expired! try Agian!!!!`;
  return new ErrorHandler(message, 400);
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  // wrong mongoose Object Id Error
  let error = { ...err };

  if (err.name === "CastError") err = handleCAstDBError(err);

  // hadlimg mongoose validation Error
  if (err.name === "validationError") err = handleValidationError(err);

  // handlimg duplicate error
  if (err.code === 11000) err = handleDuplicateError(err);

  // handling wrong jwt error
  if (err.name === "JsonWebTokenError") err = handleJsonwebtokenError(err);

  // handling expire jwt
  if (err.name === "TokenExpiredError") err = handleTokenExpiredError(err);

  res.status(err.statusCode).json({
    success: false,
    error: err.message,
  });
};
