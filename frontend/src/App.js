import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Courses from './pages/Courses';
import PrivateRoute from './components/PrivateRoute';
import UserCourses from './pages/UserCourses';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/courses"
          element={
            <PrivateRoute>
              <Courses />
            </PrivateRoute>
          }
        />
        <Route
          path="/userCourses"
          element={
            <PrivateRoute>
              <UserCourses />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
