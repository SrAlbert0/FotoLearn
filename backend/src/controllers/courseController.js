import Course from '../models/Course.js';
import UserCourse from '../models/UserCourse.js';
import { Op } from 'sequelize'; // Importamos operadores de Sequelize para manejar consultas más complejas

// Obtener todos los cursos
export const getAllCourses = async (req, res) => {
  const userId = req.user.id;

  try {
    // Obtener cursos asignados al usuario
    const assignedCourses = await UserCourse.findAll({
      where: { userId },
      include: {
        model: Course,
        attributes: ['id', 'name', 'maxMark'], // Solo los campos necesarios
      },
    });

    // Extraer los IDs de los cursos asignados
    const assignedCourseIds = assignedCourses.map((ac) => ac.courseId);

    // Obtener cursos no asignados
    const notAssignedCourses = await Course.findAll({
      where: {
        id: {
          [Op.notIn]: assignedCourseIds, // Excluir los cursos asignados
        },
      },
    });

    res.status(200).json({
      assignedCourses: assignedCourses.map((ac) => ac.Course), // Solo los datos del curso
      notAssignedCourses,
    });
  } catch (error) {
    console.error('Error al obtener los cursos:', error);
    res.status(500).json({ message: 'Error al obtener los cursos', error });
  }
};

// Asignar un usuario a un curso
export const assignUserToCourse = async (req, res) => {
  const userId = req.user.id;
  const { courseId } = req.body;

  try {
    // Verificar si el curso ya está asignado
    const existingAssignment = await UserCourse.findOne({
      where: { userId, courseId },
    });

    if (existingAssignment) {
      return res
        .status(400)
        .json({ message: 'El usuario ya está asignado a este curso' });
    }

    // Crear la relación usuario-curso
    await UserCourse.create({ userId, courseId });
    res.status(200).json({ message: 'Usuario asignado al curso con éxito' });
  } catch (error) {
    console.error('Error al asignar usuario al curso:', error);
    res.status(500).json({ message: 'Error al asignar usuario al curso', error });
  }
};
