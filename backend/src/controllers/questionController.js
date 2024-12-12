import Question from '../models/Question.js';

export const getQuestionsBySubject = async (req, res) => {
  const { subjectId } = req.params;

  try {
    const questions = await Question.findAll({ where: { subjectId } });
    res.status(200).json(questions);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las preguntas', error });
  }
};

export const submitAnswers = async (req, res) => {
  const { answers } = req.body;
  const { subjectId } = req.params;

  try {
    const questions = await Question.findAll({ where: { subjectId } });

    const results = questions.map((q, i) => ({
      question: q.question,
      correct: q.correctAnswer === answers[i],
    }));

    const allCorrect = results.every((r) => r.correct);
    res.status(200).json({ results, passed: allCorrect });
  } catch (error) {
    res.status(500).json({ message: 'Error al enviar las respuestas', error });
  }
};
