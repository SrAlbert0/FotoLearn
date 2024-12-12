import User from '../models/User.js';
import UserCourse from '../models/UserCourse.js';
import Course from '../models/Course.js';
import jwt from 'jsonwebtoken';

export const registerUser = async (req, res) => {
  const { name, email, password, camera } = req.body;

  try {
    const newUser = await User.create({ name, email, password, camera });
    res.status(201).json({ message: 'Usuario registrado con éxito', user: newUser });
  } catch (error) {
    res.status(500).json({ message: 'Error al registrar usuario', error });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user || user.password !== password) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ message: 'Inicio de sesión exitoso', token });
  } catch (error) {
    res.status(500).json({ message: 'Error al iniciar sesión', error });
  }
};

export const getUserCourses = async (req, res) => {
  const userId = req.user.id;

  try {
    const userCourses = await UserCourse.findAll({
      where: { userId },
      include: [Course],
    });

    res.status(200).json(userCourses);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los cursos del usuario', error });
  }
};
