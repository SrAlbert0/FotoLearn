import express from 'express';
import { getQuestionsByLesson, submitAnswers } from '../controllers/questionController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

// Obtener preguntas de una lección específica
router.get('/lesson/:subjectId', verifyToken, getQuestionsByLesson);

// Validar respuestas del usuario para una lección
router.post('/lesson/:subjectId/submit', verifyToken, submitAnswers);

export default router;
