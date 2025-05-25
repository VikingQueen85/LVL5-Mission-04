
import pkg from 'express';
const { Request, Response } = pkg;
import logger from '../config/winston.js';
import { model, safetySettings, AMARA_INSTRUCTIONS } from '../config/gemini.js';

export const chatController = async (req, res) => {
    const { history } = req.body;

    logger.info('Received /api/chat request', { history });

    if (!Array.isArray(history) || history.some(msg => !msg || typeof msg !== 'object' || !msg.role || !msg.text || typeof msg.role !== 'string' || typeof msg.text !== 'string')) {
        const errorMessage = "Invalid 'history' format. Each message must be an object with 'role' (string) and 'text' (string) properties.";
        logger.error(errorMessage);
        return res.status(400).json({ error: errorMessage });
    }

    const geminiHistory = [
        { role: 'user', parts: [{ text: AMARA_INSTRUCTIONS }] },
        { role: 'model', parts: [{ text: "Hi there!! My name is Amara 😊. I can help walk you through the process of choosing an insurance policy that best fits your needs. May I ask you a few personal questions to make sure I recommend the best policy for you??" }] },
        ...history.map(msg => ({ role: msg.role, parts: [{ text: msg.text }] })),
    ];

    const lastUserMessage = geminiHistory.at(-1)?.parts[0]?.text;
    if (!lastUserMessage) {
        const errorMessage = "No user message found in history.";
        logger.error(errorMessage);
        return res.status(400).json({ error: errorMessage });
    }

    try {
        const chat = model.startChat({
            history: geminiHistory.slice(0, -1),
            safetySettings,
        });
        const result = await chat.sendMessage(lastUserMessage);
        const text = result.response.text();
        logger.info('Gemini response', { response: text });
        res.json({ response: text });
    } catch (error) {
        logger.error("Error in /api/chat:", error);
        const message = error.message;
        if (message.includes('SAFETY') || message.includes('blocked')) {
            res.status(500).json({ error: "The response was blocked due to safety settings. Please try rephrasing your message." });
        } else {
            res.status(500).json({ error: "An error occurred processing your request." });
        }
    }
};
