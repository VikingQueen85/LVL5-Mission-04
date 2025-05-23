[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/4PDuOKq9)

# Mission 4 Readme

# AI Insurance Assistant

An AI assistant that helps users choose the right insurance policy by asking a series of questions and providing recommendations based on their answers.

## Overview

This project provides a containerized AI assistant application with a React frontend and Node.js backend. It leverages Google's Gemini API to power intelligent conversations.

## Features

- 🤖 AI-powered chat interface
- 🌐 Modern responsive design
- 🔒 Secure API key management
- 🐳 Containerized deployment with Docker
- 🚀 Easy setup and configuration

## Project Structure

The project consists of two main components:

- **Backend**: Node.js Express API that interacts with Google's Gemini AI
- **Frontend**: React application with a simple chat interface

## Prerequisites

- Docker and Docker Compose installed on your machine
- A Google Gemini API key

## Quick Start

### 1. Clone the repository

```

git clone https://github.com/MR-2025-PT-March-L5ADV/mission-4-girl-power/tree/Sherelynn
cd mission-4-girl-power

```

### 2. Create a `.env` file in the root directory with your Gemini API key:

```

API_KEY=your_gemini_api_key_here

```

### 3. Start the Application

```

./start-docker.sh

```

The application will be available at:

- Frontend: http://localhost:80
- Backend API: http://localhost:3000

### 4. Stop the Application

```

./stop-docker.sh

```

## Docker Deployment

This application is fully containerized - no need to run npm install or any other setup commands. Docker handles all dependencies and setup automatically.

## Architecture

- Frontend: React application with Vite
- Backend: Node.js Express server
- AI Service: Google Gemini API

## Development

To run in development mode with live reload:

```

./start-docker.sh

```

To run in detached mode:

```

./start-docker.sh

```

## Docker Images

This project uses pre-built Docker images:

- Backend: sherelynn/ai-assistant-backend:v1.0.0
- Frontend: sherelynn/ai-assistant-frontend:v1.0.0

## Acknowledgements

- Google Gemini for the AI capabilities
- React and Node.js communities for excellent frameworks
- Docker for simplified deployment

## Contributors

Sherelynn
