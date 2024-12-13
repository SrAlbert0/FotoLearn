import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../utils/api';

const Lessons = () => {
  const { courseId } = useParams(); // Obtiene el ID del curso desde la URL
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        setLoading(true);
        setError(null);

        // Corrige el uso de comillas y template literals
        const response = await api.get(`/subjects/course/${courseId}`);
        setLessons(response.data);
      } catch (err) {
        setError(err.message || 'Error desconocido al obtener los temas');
      } finally {
        setLoading(false);
      }
    };

    fetchLessons();
  }, [courseId]);

  if (loading) {
    return <p>Cargando temas...</p>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="lessons">
      <h1>Temas del Curso</h1>
      {lessons.length > 0 ? (
        <ul>
          {lessons.map((lesson) => (
            <li key={lesson.id}>
              <h2>{lesson.name}</h2>
              <p>{lesson.description}</p>
              {/* Botón que lleva al contenido de la lección */}
              <Link to={`/courses/${courseId}/lessons/${lesson.id}`}>
                <button>Ver Lección</button>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No hay temas disponibles para este curso.</p>
      )}
    </div>
  );
};

export default Lessons;
