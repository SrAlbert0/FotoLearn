import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Courses from './pages/Courses';
import Subjects from './pages/Subjects';
import Home from './pages/Home';
import Register from './pages/Register';


function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/subjects" element={<Subjects />} />
      </Routes>
    </Router>
  );
}

export default App;
