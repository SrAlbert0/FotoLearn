import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Home = () => {
  const { isAuthenticated, user, logout } = useContext(AuthContext);

  return (
    <div className="home">
      <h1>Bienvenido a FotoLearn</h1>
      {!isAuthenticated ? (
        <>
          <Link to="/login">Iniciar Sesión</Link>
          <Link to="/register">Registrarse</Link>
        </>
      ) : (
        <>
          <p>Hola, {user?.name || 'Usuario'}!</p>
          <button onClick={logout}>Cerrar Sesión</button>
          <Link to="/courses">Ver Cursos</Link>
        </>
      )}
    </div>
  );
};

export default Home;
