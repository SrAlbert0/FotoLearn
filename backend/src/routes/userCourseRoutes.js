import express from 'express';
import { getUserCourses, enrollInCourse } from '../controllers/userCourseController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

// Ruta para obtener cursos del usuario
router.get('/', verifyToken, getUserCourses);

// Ruta para inscribirse en un curso
router.post('/:courseId', verifyToken, enrollInCourse);

export default router;
