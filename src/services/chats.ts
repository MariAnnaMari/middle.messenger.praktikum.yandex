import type { Dispatch } from 'core';
import { chatsAPI } from 'api/chats';
import { transformUser } from 'helpers/apiTransformers';
import { APIError, UserDTO } from 'api/types';

export const getChats = async (dispatch: Dispatch<AppState>) => {
  dispatch({ isLoading: true });
  try {
    const { response } = await chatsAPI.getChats();
    const chatsList = JSON.parse(response);
    dispatch({ chatsList: chatsList });
  } catch (err: APIError) {
    dispatch({ isLoading: false, loginFormError: JSON.parse(err).reason });
  }
};

export const getChatUsers = async (
  dispatch: Dispatch<AppState>,
  state: AppState
) => {
  dispatch({ isLoading: true });

  const chatId = state.activeChatId;
  try {
    const { response } = await chatsAPI.getChatUsers(chatId);
    const transformUserList = JSON.parse(response).map((item: UserDTO) => {
      return transformUser(item);
    });
    dispatch({ chatUsers: transformUserList });
  } catch (err: APIError) {
    dispatch({
      chatUsers: [],
      isLoading: false,
      loginFormError: JSON.parse(err).reason,
    });
  }
};

export const deleteUserFromChat = async (
  dispatch: Dispatch<AppState>,
  state: AppState,
  action: { users: number[]; chatId: number }
) => {
  dispatch({ isLoading: true });
  try {
    await chatsAPI.deleteUserFromChat({
      users: action.users,
      chatId: action.chatId,
    });

    dispatch(getChatUsers);
  } catch (err: APIError) {
    dispatch({ isLoading: false, loginFormError: JSON.parse(err).reason });
  }
};

export const addUserToChat = async (
  dispatch: Dispatch<AppState>,
  state: AppState,
  action: { login: string; chatId: number }
) => {
  dispatch({ isLoading: true });
  try {
    const { response } = await chatsAPI.searchUserByLogin(action.login);
    const userId = JSON.parse(response)[0].id;
    try {
      await chatsAPI.addUserToChat({ users: [userId], chatId: action.chatId });
      dispatch(getChatUsers);
    } catch (err: APIError) {
      dispatch({
        isLoading: false,
        loginFormError: JSON.parse(err).reason,
      });
    }
  } catch (err: APIError) {
    dispatch({ isLoading: false, loginFormError: JSON.parse(response).reason });
  }
};

export const createChat = async (
  dispatch: Dispatch<AppState>,
  state: AppState,
  action: { title: string }
) => {
  dispatch({ isLoading: true });
  try {
    await chatsAPI.create(action);
    dispatch(getChats);
  } catch (err: APIError) {
    dispatch({ isLoading: false, loginFormError: JSON.parse(err).reason });
  }
};
