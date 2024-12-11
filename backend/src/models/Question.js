import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

const Question = sequelize.define('Question', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  question: { type: DataTypes.TEXT, allowNull: false },
  answers: { type: DataTypes.JSON, allowNull: false },
  subjectId: { type: DataTypes.INTEGER, allowNull: false },
  imageURL: { type: DataTypes.STRING },
});

export default Question;
