import express from 'express';
import UserCourse from '../models/UserCourse.js';
import Course from '../models/Course.js';

const router = express.Router();

// Obtener los cursos a los que un usuario está apuntado
router.get('/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    // Cursos a los que el usuario está apuntado
    const userCourses = await UserCourse.findAll({
      where: { userId },
      include: [Course], // Relacionar con los datos de los cursos
    });

    // IDs de los cursos asignados
    const assignedCourseIds = userCourses.map((uc) => uc.courseId);

    // Cursos no asignados
    const unassignedCourses = await Course.findAll({
      where: {
        id: { [Op.notIn]: assignedCourseIds },
      },
    });

    res.status(200).json({
      assignedCourses: userCourses,
      unassignedCourses,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los cursos del usuario', error });
  }
});

export default router;
