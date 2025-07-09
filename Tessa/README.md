
This project implements "Amara", an AI-powered virtual insurance consultant designed to help users select the most suitable car insurance policy based on their individual needs and vehicle details. The application simulates a conversation between the user and Amara, guiding the user through a needs assessment to provide tailored insurance recommendations.

Installation & Setup
To get the project up and running, follow these steps:

Clone the Repository:

git clone https://github.com/VikingQueen85/Mission-04.git
cd Mission-04

Environment Variables:
Create a .env file in the root directory of the project (where docker-compose.yml is located). This file will hold your Google API Key, which is essential for the backend to interact with the Gemini API.

GOOGLE_API_KEY=YOUR_GOOGLE_GEMINI_API_KEY

Replace YOUR_GOOGLE_GEMINI_API_KEY with your actual key.

Docker Setup (Recommended for Production-like Environment):
This project is containerized using Docker Compose for easy setup and deployment.

# Navigate to the root directory of the project (where docker-compose.yml is)
docker-compose up --build

This command will:

Build the Docker images for both the frontend (React app served by Nginx) and backend (Node.js Express server).

Create a shared Docker network for the services to communicate.

Start both containers.
The frontend will be accessible in your browser at http://localhost:5173.

Local Development (Alternative - without Docker Compose):
If you prefer to run frontend and backend locally (not recommended for this project's intended setup due to Nginx proxying):

# For Backend
cd Mission04-Backend
npm install
npm start # Starts the Node.js Express server on http://localhost:3001

# For Frontend (in a separate terminal)
cd Mission04-Frontend
npm install
npm run dev # Starts the React development server on http://localhost:5173

More Details
Core Functionality:
Conversational Interaction: Amara engages users in a natural conversation, starting with an explicit opt-in before asking qualifying questions.

Dynamic Needs Assessment: Leveraging the Google Gemini API, Amara dynamically asks questions to understand the user's vehicle type (car, truck, etc.), age, primary use, and coverage priorities (e.g., self-damage vs. third-party liability, concern about mechanical breakdowns). Questioning is not hardcoded beyond the initial greeting.

Rule-Based Recommendations: Amara applies specific business rules provided in its core instructions:

Mechanical Breakdown Insurance (MBI) is unavailable for trucks and racing cars.

Comprehensive Insurance is only for vehicles under 10 years old.

Product Knowledge: Amara is aware of three distinct insurance products: Mechanical Breakdown Insurance (MBI), Comprehensive Car Insurance, and Third Party Car Insurance, using descriptions provided in its prompt.

Reasoned Output: Upon concluding the assessment, Amara recommends one or more appropriate policies and clearly explains the reasoning behind each recommendation, referencing the user's input and the applied business rules.

Technology Stack:
AI: Google Gemini API (via @google/generative-ai SDK) provides the core conversational intelligence and decision-making based on prompted instructions.

Backend: Node.js with Express serves as the API layer, securely handling communication with the Gemini API and relaying messages to/from the frontend. Winston is used for structured logging.

Frontend: React (built with Vite) provides the user interface for the chat interaction, displaying messages and capturing user input.

Containerization: Docker and Docker Compose are used to package the frontend (served by Nginx) and backend services into portable containers, managing their build, networking, and deployment for easy portability.

This application demonstrates how a generative AI model, guided by specific instructions and business rules within a prompt, can function as a specialized virtual consultant within a standard web application architecture.

Architectural Decisions & Troubleshooting Insights:
Nginx as Frontend Proxy:

The frontend React application is served by an Nginx server running inside its own Docker container (amara_frontend).

Nginx is configured via Mission04-Frontend/nginx.conf to serve static React files and, crucially, to proxy API requests.

Requests from the frontend application to /api/chat are intercepted by Nginx and forwarded to the amara_backend service (e.g., http://backend:3001) within the Docker network. This decouples the frontend from knowing the backend's internal Docker IP/port.

Vite Proxy Removal:

During development, Vite often uses its own proxy (vite.config.js). For this Dockerized setup, the Vite proxy configuration was removed from Mission04-Frontend/vite.config.js. This ensures that Nginx is the sole proxy, preventing conflicts and ensuring consistent routing in the Docker environment.

CORS Configuration:

The backend (Mission04-Backend/config/express.js) includes CORS middleware. For development within Docker, cors({ origin: '*' }) was used to allow requests from any origin. This is necessary because the browser's origin (http://localhost:5173) is different from the internal Docker network IP that the backend sees the request coming from.

Contributors
Tessa - VikingQueen85
