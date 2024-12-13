import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';

const Courses = () => {
  const [userCourses, setUserCourses] = useState([]);
  const [availableCourses, setAvailableCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch user's assigned courses
        const userCoursesResponse = await api.get('/userCourses');
        const userCoursesData = userCoursesResponse.data.map((entry) => entry.Course) || [];

        // Fetch all available courses
        const availableCoursesResponse = await api.get('/courses');
        const notAssignedCourses = availableCoursesResponse.data.notAssignedCourses || [];

        // Update state with the fetched data
        setUserCourses(userCoursesData);
        setAvailableCourses(notAssignedCourses);
      } catch (err) {
        setError(err.message || 'Error desconocido al obtener los cursos');
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const handleEnroll = async (courseId) => {
    try {
      setLoading(true);
      setError(null);

      // Send request to enroll the user in the course
      await api.post(`/userCourses/${courseId}`);
      alert('Inscripción exitosa');

      // Refresh course lists after enrollment
      const userCoursesResponse = await api.get('/userCourses');
      const availableCoursesResponse = await api.get('/courses');

      setUserCourses(userCoursesResponse.data.map((entry) => entry.Course) || []);
      setAvailableCourses(availableCoursesResponse.data.notAssignedCourses || []);
    } catch (err) {
      alert('Error al inscribirse en el curso: ' + (err.message || 'Error desconocido'));
    } finally {
      setLoading(false);
    }
  };

  const goToCourseLessons = (courseId) => {
    navigate(`/courses/${courseId}`);
  };

  if (loading) {
    return <p>Cargando cursos...</p>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="courses">
      <h1>Mis Cursos</h1>
      {userCourses.length > 0 ? (
        <ul>
          {userCourses.map((course) => (
            <li key={course.id}>
              {course.name}{' '}
              <button onClick={() => goToCourseLessons(course.id)}>Ver Temas</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No estás inscrito en ningún curso.</p>
      )}
      <h1>Cursos Disponibles</h1>
      {availableCourses.length > 0 ? (
        <ul>
          {availableCourses.map((course) => (
            <li key={course.id}>
              {course.name}{' '}
              <button onClick={() => handleEnroll(course.id)}>Inscribirse</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No hay cursos disponibles para inscribirse.</p>
      )}
    </div>
  );
};

export default Courses;
