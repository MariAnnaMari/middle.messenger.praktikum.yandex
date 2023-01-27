import { authAPI } from 'api/auth';
import type { Dispatch } from 'core';
import { transformUser } from 'helpers/apiTransformers';
import { AvatarItem, UserDTO } from 'api/types';

type LoginPayload = {
  login: string;
  password: string;
};
export type PasswordPayload = { oldPassword: string; newPassword: string };

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
  const { response, status } = await authAPI.editProfile(action);

  if (status !== 200) {
    dispatch({ isLoading: false, loginFormError: JSON.parse(response).reason });
    return;
  }

  dispatch({ user: transformUser(JSON.parse(response) as UserDTO) });
  window.router.go('/messenger');
};

export const editPassword = async (
  dispatch: Dispatch<AppState>,
  state: AppState,
  action: PasswordPayload
) => {
  dispatch({ isLoading: true });
  const { response, status } = await authAPI.editPassword(action);

  if (status !== 200) {
    dispatch({ isLoading: false, loginFormError: JSON.parse(response).reason });
    return;
  }

  window.router.go('/setting');
};

export const editAvatar = async (
  dispatch: Dispatch<AppState>,
  state: AppState,
  action: { avatarFormData: FormData; itemId: string | number }
) => {
  try {
    const { response } = await authAPI.editAvatar(action.avatarFormData);
    const itemId = action.itemId;
    const avatarList = window.store.getState().avatarList;
    //удаляем из списка старую аватарку, чтобы получить новую
    const filteredAvatarList = avatarList.filter(
      (item: AvatarItem) => item.id !== Number(itemId)
    );

    dispatch({
      user: transformUser(JSON.parse(response) as UserDTO),
      avatarList: filteredAvatarList,
    });
  } catch (err) {
    dispatch({ isLoading: false, loginFormError: JSON.parse(err).reason });
    return;
  }
};

export const getAvatar = async (
  dispatch: Dispatch<AppState>,
  state: AppState,
  action: { id: number; avatar: string }
) => {
  const itemId = action.id;
  const avatarList = window.store.getState().avatarList;
  if (
    !avatarList
      .map((item: AvatarItem) => Number(item.id))
      .includes(Number(itemId))
  ) {
    const { responseURL } = await authAPI.getAvatar(action.avatar);
    if (responseURL) {
      dispatch({
        avatarList: [...avatarList, { id: Number(itemId), src: responseURL }],
      });
    }
  }
};
