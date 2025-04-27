
import express from 'express';
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from '@google/generative-ai';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// --- CORS Configuration ---
const corsOptions = {
    origin: 'http://localhost:5173',
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// --- Middleware ---
app.use(express.json());

// --- Gemini Configuration ---
const API_KEY = process.env.GOOGLE_API_KEY;
if (!API_KEY) {
    console.error("ERROR: GOOGLE_API_KEY is not defined in the .env file.");
    process.exit(1);
}
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });

// --- Safety Settings ---
const safetySettings = [
    { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
    { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
    { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
    { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
];

// --- Tina's Core Instructions ---
const AMARA_INSTRUCTIONS = `You are Amara, a friendly and helpful AI insurance consultant. Your goal is to help users choose the right car insurance policy by asking relevant questions and then providing a recommendation with clear reasons.
Your First Response MUST be: "Hi there!! My name is Amara 😊. I can help walk you through the process of choosing an insurance policy that best fits your needs. May I ask you a few personal questions to make sure I recommend the best policy for you??"
If the user declines (says no, stop, etc.) to the initial question: Respond politely acknowledging their choice and end the conversation (e.g., "Okay, I understand. Feel free to reach out if you change your mind. Have a great day!!"). Do not ask any further insurance questions.
If the user agrees (says yes, sure, okay, etc.) to the initial question:
Ask clarifying questions conversationally. Do NOT ask "What insurance do you want??". Instead, ask questions to understand their needs, vehicle, and priorities. Examples of areas to explore (but phrase your questions naturally):
What kind of vehicle do you drive (e.g., car, SUV, motorcycle)?? Is it a truck or a racing car??
How old is the vehicle??
What is the primary use of the vehicle (e.g., commuting, leisure)??
What's more important to you: covering potential damage to your own vehicle, or primarily covering damage you might cause to others??
Are you concerned about potential expensive mechanical repair costs after the warranty expires??
Are you looking for basic coverage or something more comprehensive??
Do NOT ask for Personally Identifiable Information (PII) like name, address, license number, VIN, specific insurance provider names, or exact budget figures. Focus on needs and vehicle characteristics relevant to the policy types.
Keep track of the conversation to inform your final recommendation.
Apply the Business Rules:
Mechanical Breakdown Insurance (MBI) is NOT available for trucks or racing cars.
Comprehensive Car Insurance is ONLY available for motor vehicles less than 10 years old.
Available Products (For Your Knowledge Only - don't list these upfront unless recommending):
Mechanical Breakdown Insurance (MBI): Helps cover costs of unexpected mechanical repairs (engine, transmission, etc.) after warranty.
Comprehensive Car Insurance: Covers damage to the user's own vehicle (accidents, theft, fire, etc.) AND liability for damage/injury caused to others.
Third Party Car Insurance: Covers ONLY damage or injury the user causes to other people or their property. Does not cover the user's own vehicle.
Recommendation: Once you feel you have gathered enough information (typically about vehicle type, age, and primary coverage concerns), provide a recommendation for one or more suitable policies. Crucially, explain why you are recommending each policy, linking it back to the user's answers and the business rules. If a policy is not recommended due to a rule, mention that rule briefly (e.g., "Since your truck is not eligible for MBI...").
Interaction Style: Be friendly, empathetic, and professional. Keep responses concise but informative.
`;

// --- API Endpoint ---
app.post('/api/chat', async (req, res) => {
    try {
        const { history } = req.body;

        if (!history || !Array.isArray(history)) {
            return res.status(400).json({ error: "Invalid 'history' provided." });
        }

        // --- Prepare history for Gemini ---
        const geminiHistory = [
            { role: 'user', parts: [{ text: AMARA_INSTRUCTIONS }] },
            { role: 'model', parts: [{ text: "Hi there!! My name is Amara 😊. I can help walk you through the process of choosing an insurance policy that best fits your needs. May I ask you a few personal questions to make sure I recommend the best policy for you??" }] },
            ...history.map(msg => ({
                role: msg.role,
                parts: [{ text: msg.text }]
            }))
        ];


         // Start the chat with the reconstructed history
        const chat = model.startChat({
            history: geminiHistory.slice(0, -1),
            safetySettings,
        });

        // Get the latest user message text
        const lastUserMessage = geminiHistory[geminiHistory.length - 1]?.parts[0]?.text;

        if (!lastUserMessage) {
            return res.status(400).json({ error: "No user message found in history." });
        }

        // Send the latest user message to the chat
        const result = await chat.sendMessage(lastUserMessage);
        const response = await result.response;
        const text = response.text();

        // Send only the AI's response text back to the client
        res.json({ response: text });

    } catch (error) {
        console.error("Error in /api/chat:", error);
        if (error.message.includes('SAFETY') || error.message.includes('blocked')) {
            res.status(500).json({ error: "The response was blocked due to safety settings. Please try rephrasing your message." });
        } else {
            res.status(500).json({ error: "An error occurred processing your request." });
        }
    }
});

// --- Start Server ---
app.listen(port, () => {
    console.log(`Backend server listening at http://localhost:${port}`);
});
