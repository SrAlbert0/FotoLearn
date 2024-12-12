import React, { useEffect, useState } from 'react';
import api from '../utils/api';

const Subjects = () => {
  const [subjects, setSubjects] = useState([]);
  const [newSubject, setNewSubject] = useState({ name: '', description: '', imageURL: '' });

  // Obtener todos los temas al cargar
  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await api.get('/subjects');
        setSubjects(response.data);
      } catch (error) {
        console.error('Error al obtener los temas:', error);
      }
    };

    fetchSubjects();
  }, []);

  // Manejar la creación de un nuevo tema
  const handleCreateSubject = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/subjects', newSubject);
      alert('Tema creado con éxito');
      setSubjects([...subjects, response.data.subject]); // Actualiza la lista de temas
      setNewSubject({ name: '', description: '', imageURL: '' });
    } catch (error) {
      console.error('Error al crear tema:', error);
      alert('No se pudo crear el tema.');
    }
  };

  return (
    <div>
      <h1>Temas</h1>
      <ul>
        {subjects.map((subject) => (
          <li key={subject.id}>
            <h3>{subject.name}</h3>
            <p>{subject.description}</p>
            {subject.imageURL && <img src={subject.imageURL} alt={subject.name} style={{ width: '100px' }} />}
          </li>
        ))}
      </ul>

      <h2>Crear un nuevo tema</h2>
      <form onSubmit={handleCreateSubject}>
        <input
          type="text"
          placeholder="Nombre del tema"
          value={newSubject.name}
          onChange={(e) => setNewSubject({ ...newSubject, name: e.target.value })}
          required
        />
        <textarea
          placeholder="Descripción"
          value={newSubject.description}
          onChange={(e) => setNewSubject({ ...newSubject, description: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="URL de la imagen"
          value={newSubject.imageURL}
          onChange={(e) => setNewSubject({ ...newSubject, imageURL: e.target.value })}
        />
        <button type="submit">Crear tema</button>
      </form>
    </div>
  );
};

export default Subjects;
