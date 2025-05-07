/**
 * @description Middleware to handle requests for routes that do no exist
 * @description Creates a 404 error and passes it to the next error-handling middleware
 */

const notFoundHandler = (req, res, next) => {
  const error = new Error(`Not Found = ${req.originalUrl}`)

  error.statusCode = 404
  error.status = "fail" // Consistent status field
  next(error) // Pass the error object to the next middleware
}

module.exports = notFoundHandler
