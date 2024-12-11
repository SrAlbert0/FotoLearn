import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<h1>Página principal</h1>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<h1>Registro</h1>} />
        <Route path="/courses" element={<h1>Cursos</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
