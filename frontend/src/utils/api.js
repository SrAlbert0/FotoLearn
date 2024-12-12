import axios from 'axios';

const api = axios.create({
  baseURL: 'https://special-happiness-vw44q945x5jcxw99-5000.app.github.dev/api',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Necesario si manejas cookies
});

export default api;
