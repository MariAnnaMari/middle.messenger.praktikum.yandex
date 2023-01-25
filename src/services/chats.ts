import type { Dispatch } from 'core';
import { chatsAPI } from 'api/chats';
import { transformUser } from 'helpers/apiTransformers';
import { UserDTO } from 'api/types';

export const getChats = async (dispatch: Dispatch<AppState>) => {
  dispatch({ isLoading: true });

  const { response } = await chatsAPI.getChats();
  const chatsList = JSON.parse(response);
  dispatch({ chatsList: chatsList });
};

export const getChatUsers = async (
  dispatch: Dispatch<AppState>,
  state: AppState
) => {
  dispatch({ isLoading: true });

  const chatId = state.activeChatId;
  const { response, status } = await chatsAPI.getChatUsers(chatId);

  if (status !== 200) {
    dispatch({ isLoading: false, loginFormError: JSON.parse(response).reason });

    dispatch({ chatUsers: [] });
    return;
  }

  const transformUserList = JSON.parse(response).map((item: UserDTO) => {
    return transformUser(item);
  });

  dispatch({ chatUsers: transformUserList });
};

export const deleteUserFromChat = async (
  dispatch: Dispatch<AppState>,
  state: AppState,
  action: { users: number[]; chatId: number }
) => {
  dispatch({ isLoading: true });

  const chatId = state.activeChatId;
  const { response, status } = await chatsAPI.deleteUserFromChat({
    users: action.users,
    chatId: chatId,
  });

  if (status !== 200) {
    dispatch({ isLoading: false, loginFormError: JSON.parse(response).reason });
    return;
  }

  dispatch(getChatUsers);
};

export const addUserToChat = async (
  dispatch: Dispatch<AppState>,
  state: AppState,
  action: { login: string }
) => {
  dispatch({ isLoading: true });
  const { response, status } = await chatsAPI.searchUserByLogin(action.login);
  if (status !== 200) {
    dispatch({ isLoading: false, loginFormError: JSON.parse(response).reason });
    return;
  }
  const userId = JSON.parse(response)[0].id;
  const chatId = state.activeChatId;
  const { response: responseAdd, status: statusAdd } =
    await chatsAPI.addUserToChat({ users: [userId], chatId: chatId });

  if (statusAdd !== 200) {
    dispatch({
      isLoading: false,
      loginFormError: JSON.parse(responseAdd).reason,
    });
    return;
  }
  dispatch(getChatUsers);
};

export const createChat = async (
  dispatch: Dispatch<AppState>,
  state: AppState,
  action: { title: string }
) => {
  dispatch({ isLoading: true });
  const { response, status } = await chatsAPI.create(action);
  if (status !== 200) {
    dispatch({ isLoading: false, loginFormError: JSON.parse(response).reason });
    return;
  }

  dispatch(getChats);
};
