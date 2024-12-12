import React, { useEffect, useState } from 'react';
import api from '../utils/api';

const Courses = () => {
  const [userCourses, setUserCourses] = useState([]);
  const [availableCourses, setAvailableCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const userCoursesResponse = await api.get('/userCourses');
        const availableCoursesResponse = await api.get('/courses');
        setUserCourses(userCoursesResponse.data);
        setAvailableCourses(
          availableCoursesResponse.data.filter(
            (course) => !userCoursesResponse.data.some((userCourse) => userCourse.courseId === course.id)
          )
        );
      } catch (error) {
        alert('Error al obtener los cursos: ' + error.message);
      }
    };
    fetchCourses();
  }, []);

  const handleEnroll = async (courseId) => {
    try {
      await api.post(`/userCourses`, { courseId }); // Enviar courseId en el body
      alert('Inscripción exitosa');
      window.location.reload();
    } catch (error) {
      alert('Error al inscribirse en el curso: ' + error.message);
    }
  };

  return (
    <div className="courses">
      <h1>Mis Cursos</h1>
      <ul>
        {userCourses.map((course) => (
          <li key={course.courseId}>{course.Course.name}</li> // Asegúrate de usar el campo correcto
        ))}
      </ul>
      <h1>Cursos Disponibles</h1>
      <ul>
        {availableCourses.map((course) => (
          <li key={course.id}>
            {course.name}
            <button onClick={() => handleEnroll(course.id)}>Inscribirse</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Courses;
