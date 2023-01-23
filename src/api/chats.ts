import { apiRequest } from './HttpTransport';

type LoginRequestData = {
  login: string;
  password: string;
};

export const chatsAPI = {
  create: (data: { title: string }) => {
    return apiRequest.post('chats', { data: data });
  },

  delete: (data: { chatId: number }) => {
    return apiRequest.post('chats', { data: data });
  },

  getChats: () => apiRequest.get('chats'),

  getChatUsers: (id: number) => apiRequest.get(`chats/${id}/users`),

  searchUserByLogin: (login: string) => {
    return apiRequest.post(`user/search`, { data: { login: login } });
  },

  addUserToChat: (params: { chatId: number; users: number[] }) => {
    return apiRequest.put(`chats/users`, { data: params });
  },

  deleteUserFromChat: (params: { chatId: number; users: number[] }) => {
    return apiRequest.delete(`chats/users`, { data: params });
  },
};
