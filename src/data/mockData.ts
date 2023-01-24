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
  user: mockUser,
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

export const mockMsgList = [mockMsg];
