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
    user: User | null;
    params: Params;
    chatting: TChatting;
  };

  export type User = {
    id: number;
    login: string;
    firstName: string;
    secondName: string;
    displayName: string;
    avatar: string;
    phone: string;
    email: string;
  };

  export type TChatting = {
    user: {
      shortName: string;
      name: string;
    };
    msgList: TMsg[];
  };
}

export {};
