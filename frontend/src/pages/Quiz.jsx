import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../utils/api';

const Quiz = () => {
  const { courseId, lessonId } = useParams();
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setLoading(true);
        setError(null);

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
    setAnswers((prev) => [...prev, selectedAnswer]);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      const incorrectAnswers = questions.filter(
        (q, index) => q.correctAnswer !== answers[index]
      );

      if (incorrectAnswers.length === 0) {
        alert('¡Has aprobado el quiz!');
        navigate(`/courses/${courseId}`);
      } else {
        alert('Has fallado algunas preguntas. Revisa la lección nuevamente.');
        navigate(`/courses/${courseId}/lessons/${lessonId}`);
      }
    }
  };

  if (loading) {
    return <p>Cargando preguntas...</p>;
  }

  if (error) {
    return <div>Error: {error}</div>;
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
