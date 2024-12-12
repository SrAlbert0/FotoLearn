import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../utils/api';

const Questions = () => {
  const { topicId } = useParams(); // Obtener el ID del tema de la URL
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);

  // Obtener preguntas del backend
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await api.get(`/topics/${topicId}/questions`);
        setQuestions(response.data);
      } catch (error) {
        alert('Error al cargar las preguntas del tema.');
      }
    };

    fetchQuestions();
  }, [topicId]);

  // Manejar cambios en las respuestas
  const handleAnswerChange = (questionId, answer) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: answer,
    }));
  };

  // Enviar respuestas y calcular puntaje
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post(`/topics/${topicId}/answers`, { answers });
      setScore(response.data.score); // Recibir puntaje del backend
    } catch (error) {
      alert('Error al enviar respuestas.');
    }
  };

  return (
    <div>
      <h1>Preguntas del Tema</h1>
      {score !== null ? (
        <div>
          <h2>Tu puntaje: {score} / {questions.length}</h2>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          {questions.map((question) => (
            <div key={question.id}>
              <p>{question.question}</p>
              {question.answers.map((answer, index) => (
                <label key={index}>
                  <input
                    type="radio"
                    name={question.id}
                    value={answer}
                    onChange={() => handleAnswerChange(question.id, answer)}
                    required
                  />
                  {answer}
                </label>
              ))}
            </div>
          ))}
          <button type="submit">Enviar Respuestas</button>
        </form>
      )}
    </div>
  );
};

export default Questions;
