export type APIError = {
  reason: string;
};

export type UserDTO = {
  id: number;
  login: string;
  first_name: string;
  second_name: string;
  display_name: string;
  avatar: string;
  phone: string;
  email: string;
};

export type TUser = {
  id: number;
  login: string;
  firstName: string;
  secondName: string;
  displayName: string;
  avatar: string;
  phone: string;
  email: string;
  role?: string;
};

export type TChat = {
  id: number;
  title: string;
  avatar: string | null;
  created_by: number;
  unread_count: number;
  last_message: TMsg | null;
};

export type TMsg = {
  user_id: number;
  time?: string;
  content: string;
};

export type LoginRequestData = {
  login: string;
  password: string;
};

export type ProfileRequestData = {
  login: string;
  password?: string;
  display_name?: string;
  first_name: string;
  second_name: string;
  email: string;
  phone: string;
};

export type AvatarItem = { id: number; src: string };
