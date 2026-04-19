/**
 * Global Error Handler Middleware
 *
 * Catches any error passed via next(error) from controllers or routes.
 * Always returns a clean JSON response so the client never sees an
 * unhandled crash or an HTML error page.
 */
const errorHandler = (err, req, res, next) => {
  // Log the full error in the server console for debugging
  console.error(`[ERROR] ${req.method} ${req.originalUrl}`);
  console.error(err.stack || err.message);

  // Mongoose validation error (e.g., missing required fields)
  if (err.name === "ValidationError") {
    const messages = Object.values(err.errors).map((e) => e.message);
    return res.status(400).json({
      success: false,
      message: "Validation Error",
      errors: messages,
    });
  }

  // Mongoose bad ObjectId (e.g., malformed _id in a query)
  if (err.name === "CastError") {
    return res.status(400).json({
      success: false,
      message: `Invalid value for field: ${err.path}`,
    });
  }

  // MongoDB duplicate key error
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    return res.status(409).json({
      success: false,
      message: `Duplicate value for field: ${field}`,
    });
  }

  // Default: internal server error
  return res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
};

module.exports = errorHandler;