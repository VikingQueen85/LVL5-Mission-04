// --- Main Entry Point ---
// --- Startup Server ---

const app = require("./src/app") // Import the Express app
const { config } = require("./src/config/index") // Import port from config

// --- Validate Essential Config ---
if (!config.API_KEY) {
  console.error("API key is not set in the environment variables.")
  process.exit(1) // Exit the process if API key is missing
}

// --- Port ---
const PORT = config.PORT // Use centralised configuration

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
