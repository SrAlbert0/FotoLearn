import User from './User.js';
import Course from './Course.js';
import UserCourse from './UserCourse.js';
import Subject from './Subject.js';
import Question from './Question.js';

// Relaciones
User.hasMany(UserCourse, { foreignKey: 'userId' });
UserCourse.belongsTo(User, { foreignKey: 'userId' });

Course.hasMany(UserCourse, { foreignKey: 'courseId' });
UserCourse.belongsTo(Course, { foreignKey: 'courseId' });

Course.belongsTo(Subject, { foreignKey: 'subjectId' });
Subject.hasMany(Course, { foreignKey: 'subjectId' });

Subject.hasMany(Question, { foreignKey: 'subjectId' });
Question.belongsTo(Subject, { foreignKey: 'subjectId' });

export { User, Course, UserCourse, Subject, Question };
