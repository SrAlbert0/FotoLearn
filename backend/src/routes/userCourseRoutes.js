import express from 'express';
import { getUserCourses } from '../controllers/userCourseController.js';

const router = express.Router();

// Ruta para obtener cursos del usuario
router.get('/', getUserCourses);

export default router;
