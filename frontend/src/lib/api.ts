import axios from 'axios';

const base = (import.meta.env.VITE_API_BASE_URL as string) || '';
const api = axios.create({
  baseURL: base
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;