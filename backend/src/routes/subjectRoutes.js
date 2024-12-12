import express from 'express';
import Subject from '../models/Subject.js';

const router = express.Router();

// Middleware para configurar CORS en las rutas de temas
router.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://special-happiness-vw44q945x5jcxw99-3000.app.github.dev');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// Obtener todos los temas
router.get('/', async (req, res) => {
  try {
    const subjects = await Subject.findAll();
    res.status(200).json(subjects);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los temas', error });
  }
});

// Crear un nuevo tema
router.post('/', async (req, res) => {
  const { name, description, imageURL } = req.body;

  if (!name || !description) {
    return res.status(400).json({ message: 'Nombre y descripción son obligatorios' });
  }

  try {
    const subject = await Subject.create({ name, description, imageURL });
    res.status(201).json({ message: 'Tema creado con éxito', subject });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el tema', error });
  }
});

export default router;
