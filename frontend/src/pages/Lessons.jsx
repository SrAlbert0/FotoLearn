import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../utils/api';

const Lessons = () => {
  const { courseId } = useParams();
  const [lessons, setLessons] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const response = await api.get(`/subjects/course/${courseId}`);
        setLessons(response.data);
      } catch (error) {
        alert('Error al obtener las lecciones: ' + error.message);
      }
    };
    fetchLessons();
  }, [courseId]);

  const handleViewLesson = (lessonId) => {
    navigate(`/lessons/${lessonId}`);
  };

  return (
    <div className="lessons">
      <h1>Lecciones del Curso</h1>
      <ul>
        {lessons.map((lesson) => (
          <li key={lesson.id}>
            {lesson.name}
            <button onClick={() => handleViewLesson(lesson.id)}>Ver Lección</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Lessons;
