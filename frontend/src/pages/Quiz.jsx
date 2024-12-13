import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../utils/api';

const Quiz = () => {
  const { courseId, lessonId } = useParams();
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch questions from backend
        const response = await api.get(`/questions/lesson/${lessonId}`);
        setQuestions(response.data);
      } catch (err) {
        setError(err.message || 'Error desconocido al cargar las preguntas');
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [lessonId]);

  const handleAnswer = (selectedAnswer) => {
    setUserAnswers((prev) => [...prev, selectedAnswer]);

    if (currentQuestionIndex < questions.length - 1) {
      // Move to next question
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      // Submit answers on the last question
      submitAnswers([...userAnswers, selectedAnswer]);
    }
  };

  const submitAnswers = async (answers) => {
    try {
      const response = await api.post(`/questions/lesson/${lessonId}/submit`, { answers });

      const { passed, incorrectCount } = response.data;

      if (passed) {
        alert('¡Has aprobado el quiz!');
        navigate(`/courses/${courseId}`);
      } else {
        alert(`Has fallado ${incorrectCount} preguntas. Revisa la lección nuevamente.`);
        navigate(`/courses/${courseId}/lessons/${lessonId}`);
      }
    } catch (err) {
      alert('Error al enviar las respuestas: ' + (err.message || 'Error desconocido'));
    }
  };

  if (loading) {
    return <p>Cargando preguntas...</p>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (questions.length === 0) {
    return <p>No hay preguntas disponibles para esta lección.</p>;
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="quiz">
      <h1>Pregunta {currentQuestionIndex + 1} de {questions.length}</h1>
      <p>{currentQuestion.question}</p>
      <ul>
        {currentQuestion.answers.map((answer, index) => (
          <li key={index}>
            <button onClick={() => handleAnswer(answer)}>{answer}</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Quiz;
