import axios from 'axios';

const API_URL = process.env.REACT_APP_BACKEND_URL || 'https://special-happiness-vw44q945x5jcxw99-5000.app.github.dev';

// Crea una instancia de Axios
const api = axios.create({
  baseURL: `${API_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Necesario si manejas cookies
});

// Añadir un interceptor para incluir el token automáticamente
api.interceptors.request.use((config) => {
  const user = localStorage.getItem('user');
  if (user) {
    const { token } = JSON.parse(user); // Asegúrate de que el objeto `user` tenga un campo `token`
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export default api;

