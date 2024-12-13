import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import api from '../utils/api';

const QuizResult = () => {
  const { courseId, lessonId } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  useEffect(() => {
    const submitAnswers = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await api.post(`/questions/lesson/${lessonId}/submit`, {
          answers: state.answers,
        });

        setResult(response.data);
      } catch (err) {
        setError(err.message || 'Error desconocido al procesar las respuestas');
      } finally {
        setLoading(false);
      }
    };

    if (state?.answers) {
      submitAnswers();
    } else {
      navigate(`/courses/${courseId}/lessons/${lessonId}`);
    }
  }, [state, lessonId, courseId, navigate]);

  if (loading) {
    return <p>Procesando resultados...</p>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const handleNavigation = () => {
    if (result.passed) {
      navigate(`/courses/${courseId}`);
    } else {
      navigate(`/courses/${courseId}/lessons/${lessonId}`);
    }
  };

  return (
    <div className="quiz-result">
      <h1>{result.passed ? '¡Felicidades, has aprobado!' : 'Revisa la lección nuevamente'}</h1>
      <p>Respuestas incorrectas: {result.incorrectCount}</p>
      <button onClick={handleNavigation}>
        {result.passed ? 'Volver al curso' : 'Volver a la lección'}
      </button>
    </div>
  );
};

export default QuizResult;
