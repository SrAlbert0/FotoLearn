import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

const Question = sequelize.define('Question', {
  question: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  answers: {
    type: DataTypes.TEXT, // Almacena las respuestas como un JSON
    allowNull: false,
    get() {
      // Convierte el texto JSON a un array al recuperar
      const rawValue = this.getDataValue('answers');
      return rawValue ? JSON.parse(rawValue) : [];
    },
    set(value) {
      // Convierte el array a texto JSON al guardar
      this.setDataValue('answers', JSON.stringify(value));
    },
  },
  correctAnswer: {
    type: DataTypes.STRING, // Respuesta correcta
    allowNull: false,
  },
  subjectId: {
    type: DataTypes.INTEGER, // Relación con el tema
    allowNull: false,
  },
});

export default Question;
