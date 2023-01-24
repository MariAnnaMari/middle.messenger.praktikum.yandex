import { apiRequest } from './HttpTransport';
import { LoginRequestData, ProfileRequestData } from './types';

export const authAPI = {
  login: (data: LoginRequestData) => {
    return apiRequest.post('auth/signin', { data: data });
  },

  me: () => {
    return apiRequest.get('auth/user');
  },

  logout: () => apiRequest.post('auth/logout'),

  signup: (data: ProfileRequestData) => {
    return apiRequest.post('auth/signup', { data: data });
  },

  editProfile: (data: ProfileRequestData) => {
    return apiRequest.put('user/profile', { data: data });
  },
};
