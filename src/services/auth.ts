import { authAPI } from 'api/auth';
import type { Dispatch } from 'core';
import { transformUser } from 'helpers/apiTransformers';
import { UserDTO } from 'api/types';

type LoginPayload = {
  login: string;
  password: string;
};

export const login = async (
  dispatch: Dispatch<AppState>,
  state: AppState,
  action: LoginPayload
) => {
  dispatch({ isLoading: true });
  console.log('login', action);
  //в ответе не json, не надо делать JSON.parse
  const { response, status } = await authAPI.login(action);

  if (status !== 200) {
    dispatch({ isLoading: false, loginFormError: JSON.parse(response).reason });
    return;
  }
  const { response: responseUser, status: statusUser } = await authAPI.me();

  dispatch({ isLoading: false, loginFormError: null });
  if (statusUser !== 200) {
    dispatch(logout);
    return;
  }

  dispatch({ user: transformUser(JSON.parse(responseUser) as UserDTO) });
  window.router.go('/messenger');
};

export const logout = async (dispatch: Dispatch<AppState>) => {
  dispatch({ isLoading: true });

  await authAPI.logout();
  dispatch({ isLoading: false, user: null, loginFormError: null });

  window.router.go('/login');
};

export const signup = async (
  dispatch: Dispatch<AppState>,
  state: AppState,
  action: LoginPayload
) => {
  dispatch({ isLoading: true });
  console.log('signup', action);
  const { response, status } = await authAPI.signup(action);

  if (status !== 200) {
    dispatch({ isLoading: false, loginFormError: JSON.parse(response).reason });
    return;
  }
  const { response: responseUser, status: statusUser } = await authAPI.me();

  dispatch({ isLoading: false, loginFormError: null });
  if (statusUser !== 200) {
    dispatch(logout);
    return;
  }

  dispatch({ user: transformUser(JSON.parse(responseUser) as UserDTO) });
  window.router.go('/messenger');
};

export const editProfile = async (
  dispatch: Dispatch<AppState>,
  state: AppState,
  action: LoginPayload
) => {
  dispatch({ isLoading: true });
  console.log('edit profile', action);
  const { response, status } = await authAPI.editProfile(action);

  if (status !== 200) {
    dispatch({ isLoading: false, loginFormError: JSON.parse(response).reason });
    return;
  }

  dispatch({ user: transformUser(JSON.parse(response) as UserDTO) });
  window.router.go('/messenger');
};
