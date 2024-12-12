import React, { useEffect, useState } from 'react';
import api from '../utils/api';

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [newCourse, setNewCourse] = useState({
    name: '',
    subjectId: '',
    maxMark: '',
  });
  

  // Obtener cursos al cargar la página
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await api.get('/courses');
        setCourses(response.data);
      } catch (error) {
        console.error('Error al obtener cursos:', error);
      }
    };

    fetchCourses();
  }, []);

  // Manejar la creación de un nuevo curso
  const handleCreateCourse = async (e) => {
    e.preventDefault();
    console.log('Datos enviados:', newCourse); // DEBUG
    try {
      const response = await api.post('/courses', newCourse);
      console.log('Respuesta del backend:', response); // DEBUG
      alert('Curso creado con éxito');
      setNewCourse({ name: '', subjectId: '', maxMark: '' });
    } catch (error) {
      console.error('Error al crear curso:', error.response || error); // DEBUG
      alert('No se pudo crear el curso.');
    }
  };
  

  return (
    <div>
      <h1>Cursos</h1>
      <ul>
        {courses.map((course) => (
          <li key={course.id}>{course.name} (Máxima nota: {course.maxMark})</li>
        ))}
      </ul>

      <h2>Crear un nuevo curso</h2>
      <form onSubmit={handleCreateCourse}>
  <input
    type="text"
    placeholder="Nombre del curso"
    value={newCourse.name}
    onChange={(e) => setNewCourse({ ...newCourse, name: e.target.value })}
    required
  />
  <input
    type="number"
    placeholder="ID del tema"
    value={newCourse.subjectId}
    onChange={(e) => setNewCourse({ ...newCourse, subjectId: Number(e.target.value) })}
    required
  />
  <input
    type="number"
    placeholder="Máxima nota"
    value={newCourse.maxMark}
    onChange={(e) => setNewCourse({ ...newCourse, maxMark: Number(e.target.value) })}
    required
  />
  <button type="submit">Crear curso</button>
</form>

    </div>
  );
};

export default Courses;
