import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useContext(AuthContext);

  // Mostrar un indicador de carga mientras se verifica el estado
  if (isLoading) {
    return <div>Cargando...</div>;
  }

  // Si el usuario no está autenticado, redirigir al login
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // Si está autenticado, renderizar el contenido protegido
  return children;
};

export default PrivateRoute;
