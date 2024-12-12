import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';
import User from './User.js';
import Course from './Course.js';

const UserCourse = sequelize.define('UserCourse', {
  userGrades: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
});

User.belongsToMany(Course, { through: UserCourse, foreignKey: 'userId' });
Course.belongsToMany(User, { through: UserCourse, foreignKey: 'courseId' });

export default UserCourse;
