import express from 'express';
import { getAllCourses, assignUserToCourse } from '../controllers/courseController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

// Obtener todos los cursos
router.get('/', verifyToken, getAllCourses);

// Asignar usuario a un curso
router.post('/assign', verifyToken, assignUserToCourse);

export default router;
