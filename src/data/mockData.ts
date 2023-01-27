export const mockUser = {
  first_name: 'Mari33',
  second_name: 'Mari33',
  avatar: null,
  email: 'test@mail.ru',
  login: 'Mari33',
  phone: '5656567676767',
};
const mockMsg = {
  content: 'this is message content',
  time: '2020-01-02T14:22:22.000Z',
  user_id: 17201,
};

const mockMsg2 = {
  chat_id: 1843,
  content: 'new2',
  file: null,
  id: 1,
  is_read: true,
  time: '2023-01-24T18:04:05+00:00',
  type: 'message',
  user_id: 184734,
  isMe: true,
};

export const mockChat = [
  {
    id: 0,
    title: 'mockChat',
    avatar: null,
    created_by: 172018,
    unread_count: 2,
    last_message: mockMsg,
  },
];

export const mockMsgList = [mockMsg, mockMsg2, mockMsg2];
