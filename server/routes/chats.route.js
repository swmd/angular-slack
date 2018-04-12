import express from 'express';
import chatsController from '../controllers/chats.controller';
import authMiddleware from '../middlewares/auth.middleware';

const router = express.Router();

router.get('/', authMiddleware, chatsController.getLast7Days);

export default router;
