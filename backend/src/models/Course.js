import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

const Course = sequelize.define('Course', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  maxMark: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

export default Course;
