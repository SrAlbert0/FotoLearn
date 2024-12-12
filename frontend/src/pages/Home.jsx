import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const Home = () => {
  const { isLoggedIn, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div>
      <h1>Bienvenido a FotoLearn</h1>
      {isLoggedIn ? (
        <div>
          <button onClick={() => navigate('/courses')}>Ver mis cursos</button>
          <button onClick={handleLogout}>Cerrar sesión</button>
        </div>
      ) : (
        <div>
          <Link to="/login">
            <button>Iniciar Sesión</button>
          </Link>
          <Link to="/register">
            <button>Registrarse</button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Home;
