import React, { useEffect, useState, useContext } from 'react';
import AuthContext from '../context/AuthContext';
import api from '../utils/api';

const UserCourses = () => {
  const { user } = useContext(AuthContext);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [availableCourses, setAvailableCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await api.get(`/userCourses/${user.id}`);
        setEnrolledCourses(response.data.enrolledCourses);
        setAvailableCourses(response.data.availableCourses);
      } catch (error) {
        console.error('Error al obtener los cursos:', error);
      }
    };

    if (user) {
      fetchCourses();
    }
  }, [user]);

  return (
    <div>
      <h1>Mis Cursos</h1>

      <h2>Cursos Inscritos</h2>
      {enrolledCourses.length > 0 ? (
        <ul>
          {enrolledCourses.map((course) => (
            <li key={course.id}>{course.name}</li>
          ))}
        </ul>
      ) : (
        <p>No estás inscrito en ningún curso.</p>
      )}

      <h2>Cursos Disponibles</h2>
      {availableCourses.length > 0 ? (
        <ul>
          {availableCourses.map((course) => (
            <li key={course.id}>{course.name}</li>
          ))}
        </ul>
      ) : (
        <p>No hay cursos disponibles.</p>
      )}
    </div>
  );
};

export default UserCourses;
