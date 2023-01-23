import { chatting } from '../data/mockData';

export const defaultState: AppState = {
  appIsInited: false,
  isLoading: false,
  screen: null,
  loginFormError: null,
  user: null,
  params: {},
  chatting: chatting,
  chatsList: []
};
