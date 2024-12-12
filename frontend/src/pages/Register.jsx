import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', camera: '' });
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await api.post('/users/register', formData);
      alert('Registro exitoso. Ahora inicia sesión.');
      navigate('/login');
    } catch (error) {
      console.error('Error al registrar:', error);
      alert('No se pudo registrar el usuario.');
    }
  };

  return (
    <div>
      <h1>Registro</h1>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Nombre"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
        <input
          type="email"
          placeholder="Correo"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Cámara"
          value={formData.camera}
          onChange={(e) => setFormData({ ...formData, camera: e.target.value })}
        />
        <button type="submit">Registrarse</button>
      </form>
    </div>
  );
};

export default Register;
