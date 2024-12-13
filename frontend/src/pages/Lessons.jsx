import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../utils/api';

const Lessons = () => {
  const { courseId } = useParams();
  const [lessons, setLessons] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const response = await api.get(`/subjects/course/${courseId}`);
        setLessons(response.data);
      } catch (error) {
        setError(error.message || 'Error desconocido al obtener los temas');
      }
    };

    fetchLessons();
  }, [courseId]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="lessons">
      <h1>Temas del Curso</h1>
      <ul>
        {lessons.map((lesson) => (
          <li key={lesson.id}>
            <h2>{lesson.name}</h2>
            <p>{lesson.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Lessons;
