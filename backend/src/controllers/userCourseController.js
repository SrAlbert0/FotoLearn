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
