
import cors from 'cors';
import express from 'express';

export const configureApp = (app) => {
    const corsOptions = {
        origin: 'http://localhost:5173',
        optionsSuccessStatus: 200,
    };
    app.use(cors(corsOptions));
    app.use(express.json());
};