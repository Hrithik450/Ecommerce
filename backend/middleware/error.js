import ErrorHandler from "../utils/errorhandler.js";

const errorMiddleware = (err, req, res, next) => {
  err.message = err.message || "Internal server error";
  err.statusCode = err.statusCode || 500;

  if (err.code === "ERR_MODULE_NOT_FOUND") {
    const message = `The module at path ${err.url} could not be found. Please check the file path and extension.`;
    err = new ErrorHandler(message, 404);
  }

  if (
    err instanceof SyntaxError &&
    err.message.includes("does not provide an export named")
  ) {
    const message = `Export mismatch: ${err.message}. Ensure your exports and imports are configured properly.`;
    err = new ErrorHandler(message, 404);
  }

  if (err.name === "JsonWebToken") {
    const message = "Json Web token is not valid, try again";
    err = new ErrorHandler(message, 400);
  }

  if (err.name === "TokenExpiredError") {
    const message = `Json Web Token is Expired, Try again `;
    err = new ErrorHandler(message, 400);
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};

export default errorMiddleware;
