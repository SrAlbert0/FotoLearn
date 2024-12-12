import express from 'express';
import Question from '../models/Question.js';

const router = express.Router();

// Obtener preguntas de un tema
router.get('/topics/:topicId/questions', async (req, res) => {
  const { topicId } = req.params;

  try {
    const questions = await Question.findAll({ where: { subjectId: topicId } });
    res.status(200).json(questions);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener preguntas.', error });
  }
});

// Validar respuestas y calcular puntaje
router.post('/topics/:topicId/answers', async (req, res) => {
  const { topicId } = req.params;
  const { answers } = req.body;

  try {
    const questions = await Question.findAll({ where: { subjectId: topicId } });

    let score = 0;
    questions.forEach((question) => {
      if (answers[question.id] === question.correctAnswer) {
        score += 1;
      }
    });

    res.status(200).json({ score });
  } catch (error) {
    res.status(500).json({ message: 'Error al validar respuestas.', error });
  }
});

export default router;
