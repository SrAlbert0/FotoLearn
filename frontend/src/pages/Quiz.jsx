import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../utils/api';

const Quiz = () => {
  const { lessonId } = useParams();
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await api.get(`/questions/subject/${lessonId}`);
        setQuestions(response.data);
      } catch (error) {
        alert('Error al obtener las preguntas: ' + error.message);
      }
    };
    fetchQuestions();
  }, [lessonId]);

  const handleSubmit = () => {
    let correctCount = 0;
    questions.forEach((question) => {
      if (answers[question.id] === question.correctAnswer) {
        correctCount += 1;
      }
    });
    if (correctCount === questions.length) {
      setResult('¡Felicidades! Has aprobado el quiz.');
    } else {
      setResult('No has aprobado. Inténtalo de nuevo.');
    }
  };

  const handleChange = (questionId, answer) => {
    setAnswers({ ...answers, [questionId]: answer });
  };

  if (result) {
    return <div className="quiz-result">{result}</div>;
  }

  return (
    <div className="quiz">
      <h1>Quiz</h1>
      {questions.map((question) => (
        <div key={question.id}>
          <h3>{question.question}</h3>
          {question.answers.map((answer, index) => (
            <div key={index}>
              <input
                type="radio"
                id={`${question.id}-${index}`}
                name={question.id}
                value={answer}
                onChange={() => handleChange(question.id, answer)}
              />
              <label htmlFor={`${question.id}-${index}`}>{answer}</label>
            </div>
          ))}
        </div>
      ))}
      <button onClick={handleSubmit}>Enviar</button>
    </div>
  );
};

export default Quiz;
