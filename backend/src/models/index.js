import User from './User.js';
import Course from './Course.js';
import UserCourse from './UserCourse.js';
import Subject from './Subject.js';
import CourseSubject from './CourseSubject.js';
import Question from './Question.js';

// Relaciones entre modelos
User.belongsToMany(Course, { through: UserCourse, foreignKey: 'userId' });
Course.belongsToMany(User, { through: UserCourse, foreignKey: 'courseId' });

Subject.belongsTo(Course, { foreignKey: 'courseId' });
Course.hasMany(Subject, { foreignKey: 'courseId' });

Subject.hasMany(Question, { foreignKey: 'subjectId' });
Question.belongsTo(Subject, { foreignKey: 'subjectId' });

UserCourse.belongsTo(Course, { foreignKey: 'courseId' }); 
UserCourse.belongsTo(User, { foreignKey: 'userId' });

export { User, Course, UserCourse, Subject, CourseSubject, Question };
