import { apiRequest } from './HttpTransport';
import type { LoginRequestData, ProfileRequestData } from './types';
import type { PasswordPayload } from 'services/auth';
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

  editPassword: (data: PasswordPayload) => {
    return apiRequest.put('user/password', { data: data });
  },

  editAvatar: (data: FormData) => {
    return apiRequest.put('user/profile/avatar', {
      data: data,
      headers: { contentType: false },
    });
  },

  getAvatar: (path: string) => {
    return apiRequest.get(`resources${path}`);
  },
};
