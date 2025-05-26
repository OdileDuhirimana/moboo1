import axios from 'axios';
import * as SecureStore from 'expo-secure-store';


const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'https://api.yourservice.com/v1';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Request interceptor
api.interceptors.request.use(async (config) => {
  const token = await SecureStore.getItemAsync('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 401) {
      // Handle token expiration
    }
    return Promise.reject(error.response?.data || error.message);
  }
);

export default api;