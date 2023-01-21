import { apiRequest } from './HttpTransport';
// import { APIError, UserDTO } from './types';

type LoginRequestData = {
  login: string;
  password: string;
};

// type LoginResponseData = {} | APIError;

export const authAPI = {
  login: (data: LoginRequestData) => {
    return apiRequest.post('auth/signin', { data: data });
  },

  me: () => {
    return apiRequest.get('auth/user');
  },

  logout: () => apiRequest.post('auth/logout'),

  signup: (data: LoginRequestData) => {
    return apiRequest.post('auth/signup', { data: data });
  },
};
