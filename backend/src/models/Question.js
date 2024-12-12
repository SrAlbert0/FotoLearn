import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

const Question = sequelize.define('Question', {
  question: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  answers: {
    type: DataTypes.JSON, 
    allowNull: false,
  },
  correctAnswer: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  subjectId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

export default Question;
