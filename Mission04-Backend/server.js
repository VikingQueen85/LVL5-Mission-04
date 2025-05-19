
import express from 'express';
import { configureApp } from './config/express.js';
import { startServer } from './config/server.js';
import router from './router.js';

const app = express();
configureApp(app);
app.use(router);
startServer(app);