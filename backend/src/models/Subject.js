import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

const Subject = sequelize.define('Subject', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT },
  imageURL: { type: DataTypes.STRING },
});

export default Subject;
