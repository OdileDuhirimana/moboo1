import api from './api';

export type LoginResponse = {
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    email: string;
    name: string;
  };
};

export type RegisterData = {
  email: string;
  password: string;
  name: string;
};

export type APIRegisterData = {
  email: string;
  password: string;
  firstname: string;
  lastname: string;
};

const AuthService = {
  async login(email: string, password: string): Promise<LoginResponse> {
    try {
      const response = await api.post<LoginResponse>('/auth/login', {
        email,
        password,
      });
      return response;
    } catch (error) {
      throw error;
    }
  },

  async register(data: RegisterData): Promise<void> {
    try {
      // Split the full name into firstname and lastname
      const nameParts = data.name.trim().split(' ');
      const firstname = nameParts[0];
      const lastname = nameParts.length > 1 ? nameParts.slice(1).join(' ') : '';

      const apiData: APIRegisterData = {
        email: data.email,
        password: data.password,
        firstname,
        lastname,
      };

      await api.post('/auth/register', apiData);
    } catch (error) {
      throw error;
    }
  },

  async logout(): Promise<void> {
    try {
      await api.post('/auth/logout');
    } catch (error) {
      throw error;
    }
  },

  async refreshToken(token: string): Promise<LoginResponse> {
    try {
      const response = await api.post<LoginResponse>('/auth/refresh', {
        refreshToken: token,
      });
      return response;
    } catch (error) {
      throw error;
    }
  },
};

export default AuthService; 