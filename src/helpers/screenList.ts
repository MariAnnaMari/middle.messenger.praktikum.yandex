import { Block } from 'core';
import { PropsType } from 'core/Block';
import LoginPage from 'pages/login';
import SignupPage from 'pages/signup';
import ProfilePage, { EditPasswordPage } from 'pages/profile';
import ChatsPage from 'pages/chats';

export enum Screens {
  Login = 'login',
  SignUp = 'sign-up',
  Profile = 'setting',
  Messenger = 'messenger',
  Password = 'password',
}

const map: Record<Screens, Block<PropsType>> = {
  [Screens.Login]: LoginPage,
  [Screens.SignUp]: SignupPage,
  [Screens.Profile]: ProfilePage,
  [Screens.Messenger]: ChatsPage,
  [Screens.Password]: EditPasswordPage,
};

export const getScreenComponent = (screen: Screens): Block<PropsType> => {
  return map[screen];
};
