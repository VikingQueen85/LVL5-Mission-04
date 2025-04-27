[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/4PDuOKq9)
# Mission 4 Readme

This project implements "Amara," an AI-powered virtual insurance consultant designed to help users select the most suitable car insurance policy based on their individual needs and vehicle details. The application simulates a conversation between the user and Amara, guiding the user through a needs assessment to provide tailored insurance recommendations.

## Installation

Replace me with the package manager you are using.

Explaining how to install the project.

```bash
npm install
npm start
```

## More Details

Core Functionality:
Conversational Interaction: Amara engages users in a natural conversation, starting with an explicit opt-in before asking qualifying questions.
Dynamic Needs Assessment: Leveraging the Google Gemini API, Amara dynamically asks questions to understand the user's vehicle type (car, truck, etc.), age, primary use, and coverage priorities (e.g., self-damage vs. third-party liability, concern about mechanical breakdowns). Questioning is not hardcoded beyond the initial greeting.
Rule-Based Recommendations: Based on the gathered information, Amara applies specific business rules provided in its core instructions:
Mechanical Breakdown Insurance (MBI) is unavailable for trucks and racing cars.
Comprehensive Insurance is only for vehicles under 10 years old.
Product Knowledge: Amara is aware of three distinct insurance products: Mechanical Breakdown Insurance (MBI), Comprehensive Car Insurance, and Third Party Car Insurance, using descriptions provided in its prompt.
Reasoned Output: Upon concluding the assessment, Amara recommends one or more appropriate policies and clearly explains the reasoning behind each recommendation, referencing the user's input and the applied business rules.
Technology Stack:
AI: Google Gemini API (via @google/generative-ai SDK) provides the core conversational intelligence and decision-making based on prompted instructions.
Backend: Node.js with Express serves as the API layer, securely handling communication with the Gemini API and relaying messages to/from the frontend.
Frontend: React (built with Vite) provides the user interface for the chat interaction, displaying messages and capturing user input.
Containerization: Docker and Docker Compose are used to package the frontend (served by Nginx) and backend services into portable containers, managing their build, networking, and deployment for easy portability.
This application demonstrates how a generative AI model, guided by specific instructions and business rules within a prompt, can function as a specialized virtual consultant within a standard web application architecture.

## Contributors

Tessa - VikingQueen85.
Sherelynn - Sherelynn
Clark -