import { authAPI } from 'api/auth';
import type { Dispatch } from 'core';
import { transformUser } from 'helpers/apiTransformers';
import { APIError, AvatarItem, ProfileRequestData, UserDTO } from 'api/types';

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

  try {
    await authAPI.login(action);
    try {
      const { response: responseUser } = await authAPI.me();
      dispatch({ isLoading: false, loginFormError: null });
      dispatch({ user: transformUser(JSON.parse(responseUser) as UserDTO) });
      window.router.go('/messenger');
    } catch (err) {
      dispatch(logout);
      dispatch({ isLoading: false, loginFormError: JSON.parse(err).reason });
    }
  } catch (err) {
    dispatch({ isLoading: false, loginFormError: JSON.parse(err).reason });
  }
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
  action: ProfileRequestData
) => {
  dispatch({ isLoading: true });
  try {
    await authAPI.signup(action);
    try {
      const { response: responseUser } = await authAPI.me();
      dispatch({
        user: transformUser(JSON.parse(responseUser) as UserDTO),
        isLoading: false,
        loginFormError: null,
      });
      window.router.go('/messenger');
    } catch (err: APIError) {
      dispatch(logout);
      dispatch({ isLoading: false, loginFormError: JSON.parse(err).reason });
    }
  } catch (err: APIError) {
    dispatch({ isLoading: false, loginFormError: JSON.parse(err).reason });
  }
};

export const editProfile = async (
  dispatch: Dispatch<AppState>,
  state: AppState,
  action: ProfileRequestData
) => {
  dispatch({ isLoading: true });
  try {
    const { response } = await authAPI.editProfile(action);
    dispatch({
      user: transformUser(JSON.parse(response) as UserDTO),
      isLoading: false,
    });
    window.router.go('/messenger');
  } catch (err: APIError) {
    dispatch({ isLoading: false, loginFormError: JSON.parse(err).reason });
  }
};

export const editPassword = async (
  dispatch: Dispatch<AppState>,
  state: AppState,
  action: PasswordPayload
) => {
  dispatch({ isLoading: true });
  try {
    await authAPI.editPassword(action);
    window.router.go('/setting');
  } catch (err: APIError) {
    dispatch({ isLoading: false, loginFormError: JSON.parse(err).reason });
  }
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
  } catch (err: APIError) {
    dispatch({ isLoading: false, loginFormError: JSON.parse(err).reason });
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
    try {
      const { responseURL } = await authAPI.getAvatar(action.avatar);
      if (responseURL) {
        dispatch({
          avatarList: [...avatarList, { id: Number(itemId), src: responseURL }],
        });
      }
    } catch (err: APIError) {
      dispatch({ loginFormError: JSON.parse(err).reason });
    }
  }
};
