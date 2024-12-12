import express from 'express';
import UserCourse from '../models/UserCourse.js';
import Course from '../models/Course.js';

const router = express.Router();

// Obtener cursos inscritos y disponibles
router.get('/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    // Cursos en los que el usuario está inscrito
    const enrolledCourses = await UserCourse.findAll({
      where: { userId },
      include: [{ model: Course, as: 'course' }],
    });

    // Obtener los IDs de los cursos en los que ya está inscrito
    const enrolledCourseIds = enrolledCourses.map((uc) => uc.courseId);

    // Cursos disponibles (no inscritos)
    const availableCourses = await Course.findAll({
      where: { id: { [Op.notIn]: enrolledCourseIds } },
    });

    res.status(200).json({
      enrolledCourses: enrolledCourses.map((uc) => uc.course),
      availableCourses,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los cursos del usuario', error });
  }
});

export default router;
