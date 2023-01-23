import { Params } from 'core/router/PathRouter';

declare global {
  export type Nullable<T> = T | null;

  export type Keys<T extends Record<string, unknown>> = keyof T;
  export type Values<T extends Record<string, unknown>> = T[Keys<T>];
  export type AppState = {
    appIsInited: boolean;
    screen: Screens | null;
    isLoading: boolean;
    loginFormError: string | null;
    user: TUser | null;
    params: Params;
    chatsList: TChat[];
    chatting: TChatting;
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

  export type TChatting = {
    user: {
      shortName: string;
      name: string;
    };
    msgList: TMsg[];
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
    user: {
      first_name: string;
      second_name: string;
      avatar: string | null;
      email: string;
      login: string;
      phone: string;
    };
    time: string;
    content: string;
  };
}

export {};
