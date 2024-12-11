import express from 'express';
import Course from '../models/Course.js';

const router = express.Router();

// Ruta para obtener todos los cursos
router.get('/', async (req, res) => {
  try {
    const courses = await Course.findAll();
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los cursos', error });
  }
});

// Ruta para crear un nuevo curso
router.post('/', async (req, res) => {
  const { name, subjectId, maxMark } = req.body;

  try {
    const course = await Course.create({ name, subjectId, maxMark });
    res.status(201).json({ message: 'Curso creado con éxito', course });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el curso', error });
  }
});

export default router;
