// --- Main Entry Point ---
// --- Startup Server ---

const app = require("./src/app") // Import the Express app
const config = require("./src/config/index") // Import port from config

// --- Port ---

const PORT = config.PORT // Use centralised configuration

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
