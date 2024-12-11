import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

const UserCourse = sequelize.define('UserCourse', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  courseName: { type: DataTypes.STRING, allowNull: false },
  userId: { type: DataTypes.INTEGER, allowNull: false },
  courseId: { type: DataTypes.INTEGER, allowNull: false },
  userGrades: { type: DataTypes.FLOAT },
});

export default UserCourse;
