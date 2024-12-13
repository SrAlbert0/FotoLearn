import Question from '../models/Question.js';

// Obtener preguntas de una lección específica (subjectId)
export const getQuestionsByLesson = async (req, res) => {
  const { subjectId } = req.params;

  try {
    const questions = await Question.findAll({ where: { subjectId } });

    if (!questions || questions.length === 0) {
      return res.status(404).json({ message: 'No se encontraron preguntas para esta lección.' });
    }

    res.status(200).json(questions);
  } catch (error) {
    console.error('Error al obtener las preguntas de la lección:', error);
    res.status(500).json({ message: 'Error al obtener las preguntas.', error: error.message });
  }
};

// Enviar respuestas y verificar resultados
export const submitAnswers = async (req, res) => {
  const { answers } = req.body; // Respuestas enviadas por el usuario
  const { subjectId } = req.params;

  try {
    // Buscar todas las preguntas asociadas al subjectId (lección)
    const questions = await Question.findAll({ where: { subjectId } });

    if (!questions || questions.length === 0) {
      return res.status(404).json({ message: 'No se encontraron preguntas para verificar.' });
    }

    // Validar las respuestas del usuario comparándolas con las respuestas correctas
    const results = questions.map((question, index) => {
      const userAnswer = answers[index]?.trim(); // Respuesta enviada por el usuario
      const correct = question.correctAnswer === userAnswer; // Comparar con la respuesta correcta
      return {
        question: question.question,
        correctAnswer: question.correctAnswer,
        userAnswer,
        correct,
      };
    });

    const allCorrect = results.every((result) => result.correct); // Verificar si todas son correctas
    const incorrectCount = results.filter((result) => !result.correct).length; // Contar las incorrectas

    res.status(200).json({
      results,
      passed: allCorrect,
      incorrectCount,
    });
  } catch (error) {
    console.error('Error al verificar las respuestas:', error);
    res.status(500).json({ message: 'Error al verificar las respuestas.', error: error.message });
  }
};
