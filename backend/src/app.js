import express from 'express';
import dotenv from 'dotenv';
import { sequelize } from './config/database.js';
import userRoutes from './routes/userRoutes.js';
import courseRoutes from './routes/courseRoutes.js';
import subjectRoutes from './routes/subjectRoutes.js'; // Importar rutas de temas
import questionRoutes from './routes/questionRoutes.js'; // Importar rutas de preguntas
import userCourseRoutes from './routes/userCourseRoutes.js';
import cors from 'cors';

dotenv.config();

const app = express();

// Configuración de CORS
const corsOptions = {
  origin: [
    'http://localhost:3000', // Para desarrollo local
    'https://special-happiness-vw44q945x5jcxw99-3000.app.github.dev', // Tu frontend en Codespaces
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Métodos soportados
  allowedHeaders: ['Content-Type', 'Authorization'], // Headers permitidos
  credentials: true, // Necesario si usas cookies o autenticación basada en sesiones
};

// Aplicar CORS
app.use(cors(corsOptions));

// Manejo de solicitudes preflight
app.options('*', cors(corsOptions));

// Middleware
app.use(express.json()); // Parsear JSON en las solicitudes

// Rutas
app.use('/api/users', userRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/subjects', subjectRoutes);
app.use('/api/questions', questionRoutes);
app.use('/api/userCourses', userCourseRoutes);

// Sincronización de base de datos
sequelize.authenticate()
  .then(() => console.log('Base de datos conectada'))
  .catch(err => console.error('Error de conexión:', err));

sequelize.sync({ alter: true }) // Sincronizar modelos con la base de datos
  .then(() => console.log('Modelos sincronizados con la base de datos'))
  .catch(err => console.error('Error al sincronizar modelos:', err));

// Configuración del servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
