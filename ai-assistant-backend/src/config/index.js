/**
 * @description Centralised configuration file
 * @description This file loads environment variables from a .env file
 */

require("dotenv").config() // Load environment variable from .env file

const config = {
  PORT: process.env.PORT || 3000,
  API_KEY: process.env.API_KEY,
}

module.exports = { config }
