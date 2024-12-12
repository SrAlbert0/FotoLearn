import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';
import Course from './Course.js';
import Subject from './Subject.js';

const CourseSubject = sequelize.define('CourseSubject', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  courseId: {
    type: DataTypes.INTEGER,
    references: {
      model: Course,
      key: 'id',
    },
  },
  subjectId: {
    type: DataTypes.INTEGER,
    references: {
      model: Subject,
      key: 'id',
    },
  },
});

export default CourseSubject;
