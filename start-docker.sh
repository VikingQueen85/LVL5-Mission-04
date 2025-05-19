#!/bin/bash
# Helper script to start Docker containers

# Check for API key
if [ ! -f .env ]; then
  echo "Error: .env file not found!"
  echo "Please create a .env file with your API_KEY=your_gemini_api_key_here"
  exit 1
fi

# Build and start the containers
echo "Building and starting Docker containers..."
docker-compose up --build $@

echo "Application is running:"
echo "- Frontend: http://localhost:80"
echo "- Backend: http://localhost:3000"