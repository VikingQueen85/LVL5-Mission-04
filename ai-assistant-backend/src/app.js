// --- Core Dependencies ---
const express = require("express")
const cors = require("cors")
const morgan = require("morgan")

// --- Application Modules ---
const notFoundHandler = require("./middleware/notFoundHandler")
const globalErrorHandler = require("./middleware/globalErrorHandler")

// --- Initialise Express ---
const app = express()

// --- Middleware Setup ---
app.use(cors()) // Enable CORS for all origins
app.use(express.json()) // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })) // Parse form data
app.use(morgan("dev")) // Log HTTP requests to the console

// --- Basic Root Route ---
app.get("/", (req, res) => {
  res.status(200).send("Welcome to the AI Assistant API")
})

// --- Mount Routes ---
// mount routes here

// // --- Not Found Handler ---
// app.all("*", notFoundHandler)

// // --- Global Error Handler ---
// app.use(globalErrorHandler)

module.exports = app
