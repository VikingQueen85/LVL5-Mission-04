
import cors from 'cors';
import express from 'express';

export const configureApp = (app) => {
    const corsOptions = {
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: true,
        optionsSuccessStatus: 200,
    };
    app.use(cors(corsOptions));
    app.use(express.json());
};