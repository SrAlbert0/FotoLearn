import React, { useEffect, useState } from 'react';
import api from '../utils/api';

const Courses = () => {
  const [userCourses, setUserCourses] = useState([]);
  const [availableCourses, setAvailableCourses] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        // Realizamos las solicitudes
        const userCoursesResponse = await api.get('/userCourses');
        const availableCoursesResponse = await api.get('/courses');

        // Obtenemos los datos
        const userCoursesData = userCoursesResponse.data.map((entry) => entry.Course) || [];
        const notAssignedCourses = availableCoursesResponse.data.notAssignedCourses || [];

        // Actualizamos los estados
        setUserCourses(userCoursesData);
        setAvailableCourses(notAssignedCourses);
      } catch (error) {
        setError(error.message || 'Error desconocido al obtener los cursos');
      }
    };

    fetchCourses();
  }, []);

  const handleEnroll = async (courseId) => {
    try {
      await api.post(`/userCourses/${courseId}`);
      alert('Inscripción exitosa');
      window.location.reload(); // Recargamos la página para actualizar los cursos
    } catch (error) {
      alert('Error al inscribirse en el curso: ' + error.message);
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="courses">
      <h1>Mis Cursos</h1>
      <ul>
        {userCourses.map((course) => (
          <li key={course.id}>{course.name}</li>
        ))}
      </ul>
      <h1>Cursos Disponibles</h1>
      <ul>
        {availableCourses.map((course) => (
          <li key={course.id}>
            {course.name} <button onClick={() => handleEnroll(course.id)}>Inscribirse</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Courses;
