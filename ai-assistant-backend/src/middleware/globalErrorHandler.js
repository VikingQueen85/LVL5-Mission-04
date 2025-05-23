/**
 * @description Global Error Handling Middleware
 * @ Catches all errors passed via net(error)
 * Sends a detailed error response
 * IMPORTANT: Must have 4 arguments (err, req, res, next) to be recognized by Express

 */

const globalErrorHandler = (err, req, res, next) => {
  // Set defaults if not already present in the error object
  const statusCode = err.statusCode || 500
  const status = err.status || "error"

  // Log the error stack trace to the console (essential for debugging)
  console.error("GLOBAL ERROR HANDLER: ", err)

  // Send detailed error response back to the client
  res.status(statusCode).json({
    status,
    message: err.message || "Something went wrong", // Use error message if available or default

    // Development only: include full error object and stack
    error: err,
    stack: err.stack,
  })
}

module.exports = globalErrorHandler
