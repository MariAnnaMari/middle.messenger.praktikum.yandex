import type { Dispatch } from 'core';
import { authAPI } from 'api/auth';
import { transformUser } from 'helpers/apiTransformers';
import { APIError, UserDTO } from 'api/types';

export async function initApp(dispatch: Dispatch<AppState>) {
  try {
    const { response } = await authAPI.me();
    dispatch({ user: transformUser(JSON.parse(response) as UserDTO) });
  } catch (err: APIError) {
    dispatch({ loginFormError: JSON.parse(err).reason });
  } finally {
    dispatch({ appIsInited: true });
  }
}
