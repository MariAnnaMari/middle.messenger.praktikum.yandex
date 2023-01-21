import type { Dispatch } from 'core';
import { authAPI } from 'api/auth';
import { transformUser } from 'helpers/apiTransformers';
import { UserDTO } from 'api/types';

export async function initApp(dispatch: Dispatch<AppState>) {
  try {
    const { response, status } = await authAPI.me();
    if (status !== 200) {
      return;
    }

    dispatch({ user: transformUser(JSON.parse(response) as UserDTO) });
  } catch (err) {
    console.log(err);
  } finally {
    dispatch({ appIsInited: true });
  }

  dispatch({ appIsInited: true });
}
