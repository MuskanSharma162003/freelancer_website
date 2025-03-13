import axios from 'axios';
const baseURL = 'http://localhost:5000/api';

const axiosInstance = axios.create({
  baseURL: baseURL,
  timeout: 10000,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      window.location = '/login';
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;