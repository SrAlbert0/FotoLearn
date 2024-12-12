import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../utils/api';

const LessonDetails = () => {
  const { lessonId } = useParams();
  const [lesson, setLesson] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLesson = async () => {
      try {
        const response = await api.get(`/subjects/${lessonId}`);
        setLesson(response.data);
      } catch (error) {
        alert('Error al obtener la lección: ' + error.message);
      }
    };
    fetchLesson();
  }, [lessonId]);

  const handleTakeQuiz = () => {
    navigate(`/lessons/${lessonId}/quiz`);
  };

  if (!lesson) {
    return <div>Cargando lección...</div>;
  }

  return (
    <div className="lesson-details">
      <h1>{lesson.name}</h1>
      <p>{lesson.text}</p>
      <button onClick={handleTakeQuiz}>Realizar Quiz</button>
    </div>
  );
};

export default LessonDetails;
