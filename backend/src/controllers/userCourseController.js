import UserCourse from '../models/UserCourse.js';
import Course from '../models/Course.js';

export const getUserCourses = async (req, res) => {
  try {
    const userId = req.user.id; // Asegúrate de que `req.user` tiene el ID del usuario logueado.
    const userCourses = await UserCourse.findAll({
      where: { userId },
      include: [Course],
    });
    res.status(200).json(userCourses);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los cursos del usuario', error });
  }
};

// Nueva función: Inscribir al usuario en un curso
export const enrollInCourse = async (req, res) => {
  try {
    const userId = req.user.id; // Obtén el ID del usuario logueado
    const { courseId } = req.params;

    // Verifica si el usuario ya está inscrito en el curso
    const existingEnrollment = await UserCourse.findOne({ where: { userId, courseId } });
    if (existingEnrollment) {
      return res.status(400).json({ message: 'Ya estás inscrito en este curso' });
    }

    // Crea la inscripción
    const newEnrollment = await UserCourse.create({ userId, courseId });
    res.status(201).json({ message: 'Inscripción exitosa', enrollment: newEnrollment });
  } catch (error) {
    res.status(500).json({ message: 'Error al inscribirse en el curso', error });
  }
};
