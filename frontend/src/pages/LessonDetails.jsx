import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../utils/api';

const LessonDetails = () => {
  const { courseId, lessonId } = useParams(); // Obtiene los IDs de curso y lección desde la URL
  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLessonDetails = async () => {
      try {
        setLoading(true);
        setError(null);

        // Realiza la solicitud para obtener los detalles de la lección
        const response = await api.get(`/subjects/${lessonId}`);
        setLesson(response.data);
      } catch (err) {
        setError(err.message || 'Error desconocido al cargar la lección');
      } finally {
        setLoading(false);
      }
    };

    fetchLessonDetails();
  }, [lessonId]);

  if (loading) {
    return <p>Cargando lección...</p>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!lesson) {
    return <div>No se encontró la lección solicitada.</div>;
  }

  return (
    <div className="lesson-details">
      <h1>{lesson.name}</h1>
      <p>{lesson.description}</p>
      {lesson.imageURL && (
        <div>
          <img
            src={lesson.imageURL}
            alt={lesson.name}
            style={{ maxWidth: '100%', height: 'auto' }}
          />
        </div>
      )}
      <p>{lesson.text}</p>
      {/* Botón para comenzar el quiz */}
      <button
        onClick={() => navigate(`/courses/${courseId}/lessons/${lessonId}/quiz`)}
      >
        Comenzar Quiz
      </button>
    </div>
  );
};

export default LessonDetails;
