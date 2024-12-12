import express from 'express';
import { loginUser, registerUser } from '../controllers/userController.js';
import { verifyToken } from '../middleware/authMiddleware.js';
import { User, Course } from '../models/index.js';

const router = express.Router();

// Registro de usuario
router.post('/register', registerUser);

// Inicio de sesión de usuario
router.post('/login', loginUser);

// Obtener cursos del usuario autenticado
router.get('/courses', verifyToken, async (req, res) => {
  try {
    const userId = req.user.id; // Extraer el ID del usuario autenticado desde el middleware
    const user = await User.findByPk(userId, {
      include: [
        {
          model: Course,
          through: {
            attributes: [], // Excluir datos intermedios si no son necesarios
          },
        },
      ],
    });

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.status(200).json(user.Courses);
  } catch (error) {
    console.error('Error al obtener los cursos del usuario:', error);
    res.status(500).json({ message: 'Error al obtener los cursos del usuario', error });
  }
});

export default router;
