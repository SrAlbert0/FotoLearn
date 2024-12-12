import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../utils/api';

const CourseDetails = () => {
  const { courseId } = useParams();
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await api.get(`/courses/${courseId}/subjects`);
        setSubjects(response.data);
      } catch (error) {
        alert('Error al cargar los temas del curso.');
      }
    };

    fetchSubjects();
  }, [courseId]);

  return (
    <div>
      <h1>Temas del Curso</h1>
      <ul>
        {subjects.map((subject) => (
          <li key={subject.id}>
            <a href={`/topic/${subject.id}/questions`}>{subject.name}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CourseDetails;
