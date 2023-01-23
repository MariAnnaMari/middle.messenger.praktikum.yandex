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

  getChatsUsers: (id: number) => apiRequest.get(`chats/${id}/users`),

  editProfile: (data: LoginRequestData) => {
    return apiRequest.put('user/profile', { data: data });
  },
};
