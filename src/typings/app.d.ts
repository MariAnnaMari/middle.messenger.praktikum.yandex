import { Params } from 'core/router/PathRouter';
import { AvatarItem, TChat, TMsg, TUser } from "api/types";

declare global {
  export type Nullable<T> = T | null;

  export type Keys<T extends Record<string, unknown>> = keyof T;
  export type Values<T extends Record<string, unknown>> = T[Keys<T>];
  export type Indexed = { [key: string]: any };

  export type AppState = {
    appIsInited: boolean;
    screen: Screens | null;
    isLoading: boolean;
    loginFormError: string | null;
    user: TUser | null;
    params: Params;
    chatsList: TChat[];
    chatUsers: TUser[];
    chatSocket: WebSocket | null;
    activeChatId: number | null;
    messages: TMsg[];
    avatarList: AvatarItem[];
  };
}

export {};
