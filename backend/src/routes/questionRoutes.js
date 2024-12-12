import express from 'express';
import { getQuestionsBySubject, submitAnswers } from '../controllers/questionController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

// Obtener preguntas de un tema
router.get('/subject/:subjectId', verifyToken, getQuestionsBySubject);

// Validar respuestas del usuario
router.post('/subject/:subjectId/submit', verifyToken, submitAnswers);

export default router;
