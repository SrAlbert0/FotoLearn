import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Cambia esto si el backend usa otro puerto o dominio
  headers: {
    'Content-Type': 'application/json',
  },
});

// Exportar el cliente Axios configurado
export default api;
