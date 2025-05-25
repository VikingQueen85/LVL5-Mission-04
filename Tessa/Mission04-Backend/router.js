
import express from 'express';
import { chatController } from './controllers/chat.js';

const router = express.Router();
router.post('/api/chat', chatController);

export default router;