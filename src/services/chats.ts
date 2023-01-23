import { authAPI } from 'api/auth';
// import { UserDTO } from 'api/types';
import type { Dispatch } from 'core';
import { transformUser } from 'helpers/apiTransformers';
import { UserDTO } from 'api/types';
import { chatsAPI } from 'api/chats';

type LoginPayload = {
  login: string;
  password: string;
};

export const getChats = async (
  dispatch: Dispatch<AppState>,
  state: AppState,
  action: LoginPayload
) => {
  dispatch({ isLoading: true });

  const { response, status } = await chatsAPI.getChats();

  console.log('get chats', response);
  if (status !== 200) {
    // dispatch({ isLoading: false, loginFormError: JSON.parse(response).reason });
    return;
  }

  dispatch({ chatsList: JSON.parse(response) });
 // window.router.go('/messenger');
};
