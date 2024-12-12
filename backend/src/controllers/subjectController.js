import Subject from '../models/Subject.js';

// Obtener temas de un curso
export const getSubjectsByCourse = async (req, res) => {
  const { courseId } = req.params;

  try {
    const subjects = await Subject.findAll({ where: { courseId } });
    res.status(200).json(subjects);
  } catch (error) {
    console.error('Error al obtener los temas del curso:', error);
    res.status(500).json({ message: 'Error al obtener los temas del curso', error });
  }
};

// Obtener detalles de un tema
export const getSubjectDetails = async (req, res) => {
  const { subjectId } = req.params;

  try {
    const subject = await Subject.findByPk(subjectId);
    if (!subject) {
      return res.status(404).json({ message: 'Tema no encontrado' });
    }
    res.status(200).json(subject);
  } catch (error) {
    console.error('Error al obtener los detalles del tema:', error);
    res.status(500).json({ message: 'Error al obtener los detalles del tema', error });
  }
};

// Crear un nuevo tema asociado a un curso
export const createSubject = async (req, res) => {
  const { courseId } = req.params;
  const { name, description, text, imageURL } = req.body;

  if (!name) {
    return res.status(400).json({ message: 'El nombre del tema es obligatorio' });
  }

  try {
    const newSubject = await Subject.create({
      name,
      description,
      text,
      imageURL,
      courseId,
    });

    res.status(201).json({ message: 'Tema creado con éxito', newSubject });
  } catch (error) {
    console.error('Error al crear el tema:', error);
    res.status(500).json({ message: 'Error al crear el tema', error });
  }
};
