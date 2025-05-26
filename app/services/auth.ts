import api from './api';

export const AuthService = {
  login: (email: string, password: string) => 
    api.post('/auth/login', { email, password }),
  
  logout: () => api.post('/auth/logout'),
  
  register: (userData: any) => 
    api.post('/auth/register', userData),
  
  refreshToken: (refreshToken: string) => 
    api.post('/auth/refresh', { refreshToken }),
  
  forgotPassword: (email: string) => 
    api.post('/auth/forgot-password', { email }),
};