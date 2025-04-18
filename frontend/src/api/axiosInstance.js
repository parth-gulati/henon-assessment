// axiosInstance.js - This file creates an Axios instance with a base URL and 
// sets up Loading state management using interceptors.

import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080',
});

export const setupInterceptors = (setLoading) => {
  axiosInstance.interceptors.request.use(
    config => {
      setLoading(true);
      return config;
    },
    error => {
      setLoading(false);
      return Promise.reject(error);
    }
  );

  axiosInstance.interceptors.response.use(
    response => {
      setLoading(false);
      return response;
    },
    error => {
      setLoading(false);
      return Promise.reject(error);
    }
  );
};

export default axiosInstance;
