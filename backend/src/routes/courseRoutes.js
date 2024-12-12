import express from 'express';
import Course from '../models/Course.js';

const router = express.Router();

// Middleware para configurar CORS en las rutas de cursos
router.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://special-happiness-vw44q945x5jcxw99-3000.app.github.dev'); // URL del frontend
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); // Métodos permitidos
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Encabezados permitidos
  next(); // Continua con la siguiente middleware o ruta
});

// Obtener todos los cursos
router.get('/', async (req, res) => {
  try {
    const courses = await Course.findAll();
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los cursos', error });
  }
});

// Crear un nuevo curso
router.post('/', async (req, res) => {
  const { name, subjectId, maxMark } = req.body;

  if (!name || !subjectId || !maxMark) {
    return res.status(400).json({ message: 'Todos los campos son obligatorios' });
  }

  try {
    const course = await Course.create({ name, subjectId, maxMark });
    res.status(201).json({ message: 'Curso creado con éxito', course });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el curso', error });
  }
});

export default router;
