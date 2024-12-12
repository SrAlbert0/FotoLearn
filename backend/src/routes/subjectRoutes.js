import express from 'express';
import { getSubjectsByCourse, getSubjectDetails, createSubject } from '../controllers/subjectController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

// Obtener temas de un curso
router.get('/course/:courseId', verifyToken, getSubjectsByCourse);

// Obtener detalles de un tema
router.get('/:subjectId', verifyToken, getSubjectDetails);

// Crear un nuevo tema asociado a un curso
router.post('/course/:courseId', verifyToken, createSubject);

export default router;
