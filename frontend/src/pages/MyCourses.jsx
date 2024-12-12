import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';

const MyCourses = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchUserCourses = async () => {
      try {
        const response = await api.get('/users/courses', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setCourses(response.data);
      } catch (error) {
        alert('Error al cargar los cursos del usuario.');
      }
    };

    fetchUserCourses();
  }, []);

  return (
    <div>
      <h1>Mis Cursos</h1>
      {courses.length === 0 ? (
        <p>No estás inscrito en ningún curso.</p>
      ) : (
        <ul>
          {courses.map((course) => (
            <li key={course.id}>
              <Link to={`/course/${course.id}`}>{course.name}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyCourses;
