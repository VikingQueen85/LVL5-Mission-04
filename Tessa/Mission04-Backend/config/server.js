
import express from 'express';

const port = process.env.PORT || 3001;
export const startServer = (app) => {
    app.listen(port, () => {
        console.log(`Backend server listening at http://localhost:${port}`);
    });
};