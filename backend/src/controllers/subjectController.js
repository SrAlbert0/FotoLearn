import Subject from '../models/Subject.js';

// Obtener temas de un curso
export const getSubjectsByCourse = async (req, res) => {
  const { courseId } = req.params;

  try {
    // Valida que el `courseId` sea un número válido
    if (isNaN(courseId)) {
      return res.status(400).json({ message: 'El ID del curso debe ser un número válido' });
    }

    const subjects = await Subject.findAll({ where: { courseId } });

    if (!subjects || subjects.length === 0) {
      return res.status(404).json({ message: 'No se encontraron temas para este curso' });
    }

    res.status(200).json(subjects);
  } catch (error) {
    console.error('Error al obtener los temas del curso:', error);
    res.status(500).json({ message: 'Error al obtener los temas del curso', error: error.message });
  }
};

// Obtener detalles de un tema
export const getSubjectDetails = async (req, res) => {
  const { subjectId } = req.params;

  try {
    // Valida que el `subjectId` sea un número válido
    if (isNaN(subjectId)) {
      return res.status(400).json({ message: 'El ID del tema debe ser un número válido' });
    }

    const subject = await Subject.findByPk(subjectId);

    if (!subject) {
      return res.status(404).json({ message: 'Tema no encontrado' });
    }

    res.status(200).json(subject);
  } catch (error) {
    console.error('Error al obtener los detalles del tema:', error);
    res.status(500).json({ message: 'Error al obtener los detalles del tema', error: error.message });
  }
};

// Crear un nuevo tema asociado a un curso
export const createSubject = async (req, res) => {
  const { courseId } = req.params;
  const { name, description, text, imageURL } = req.body;

  // Validación de los campos
  if (!name) {
    return res.status(400).json({ message: 'El nombre del tema es obligatorio' });
  }

  try {
    // Valida que el `courseId` sea un número válido
    if (isNaN(courseId)) {
      return res.status(400).json({ message: 'El ID del curso debe ser un número válido' });
    }

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
    res.status(500).json({ message: 'Error al crear el tema', error: error.message });
  }
};
