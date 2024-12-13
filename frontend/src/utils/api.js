import axios from 'axios';

// Establece la URL base desde las variables de entorno o un valor predeterminado
const API_URL = process.env.REACT_APP_BACKEND_URL || 'https://special-happiness-vw44q945x5jcxw99-5000.app.github.dev';

// Crea una instancia de Axios
const api = axios.create({
  baseURL: `${API_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Necesario si manejas cookies o autenticación cruzada
});

// Interceptor para agregar el token automáticamente a las solicitudes
api.interceptors.request.use(
  (config) => {
    try {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const { token } = JSON.parse(storedUser); // Extrae el token del almacenamiento local
        if (token) {
          config.headers.Authorization = `Bearer ${token}`; // Añade el token al encabezado Authorization
        }
      }
    } catch (error) {
      console.error('Error al procesar el token del usuario:', error);
    }
    return config;
  },
  (error) => {
    // Maneja errores antes de enviar la solicitud
    return Promise.reject(error);
  }
);

// Interceptor para manejar respuestas de error
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Si el token es inválido o ha expirado, redirigir al login
      console.warn('Token inválido o expirado. Redirigiendo al login...');
      localStorage.removeItem('user'); // Limpia los datos del usuario

      // Opcional: Mostrar una alerta para informar al usuario antes de redirigir
      alert('Tu sesión ha expirado. Por favor, inicia sesión nuevamente.');
      window.location.href = '/login'; // Redirige al login
    }
    return Promise.reject(error);
  }
);

export default api;
