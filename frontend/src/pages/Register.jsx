import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [camera, setCamera] = useState('');
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const navigate = useNavigate();

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

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/users/register', {
        name,
        email,
        password,
        camera,
        courseId: selectedCourse,
      });
      alert('Registro exitoso');
      navigate('/login'); // Redirigir al login
    } catch (error) {
      alert('Error al registrar el usuario.');
    }
  };

  return (
    <div>
      <h1>Registrarse</h1>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Cámara"
          value={camera}
          onChange={(e) => setCamera(e.target.value)}
        />
        <select value={selectedCourse} onChange={(e) => setSelectedCourse(e.target.value)} required>
          <option value="" disabled>Selecciona un curso</option>
          {courses.map((course) => (
            <option key={course.id} value={course.id}>{course.name}</option>
          ))}
        </select>
        <button type="submit">Registrarse</button>
      </form>
    </div>
  );
};

export default Register;
