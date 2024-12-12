import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <h1>Bienvenido a FotoLearn</h1>
      <p>Elige una sección para empezar:</p>
      <div>
        <Link to="/courses">
          <button>Cursos</button>
        </Link>
        <Link to="/subjects">
          <button>Temas</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
