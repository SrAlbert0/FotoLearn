import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';
import Course from './Course.js';

const Subject = sequelize.define('Subject', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  text: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  imageURL: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  courseId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Course,
      key: 'id',
    },
  },
});

Subject.belongsTo(Course, { foreignKey: 'courseId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Course.hasMany(Subject, { foreignKey: 'courseId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

export default Subject;
