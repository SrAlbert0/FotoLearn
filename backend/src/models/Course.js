import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

const Course = sequelize.define('Course', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  subjectId: { type: DataTypes.INTEGER, allowNull: false },
  maxMark: { type: DataTypes.INTEGER, allowNull: false },
});

export default Course;
