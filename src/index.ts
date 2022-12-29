import { renderDOM, registerComponent } from './core';
import LoginPage from 'pages/login';
import SignupPage from 'pages/signup';
import ChatsPage from 'pages/chats';
import ProfilePage from 'pages/profile';
import ErrorPage from './pages/error';

import './styles/app.css';

import Button from 'components/button';
import Link from 'components/link';
import Input from 'components/input';
import ControlledInput from 'components/controlledInput';
import ErrorComponent from 'components/error';
import Layout from 'components/layout';
import Avatar from 'components/avatar';
import ChatItem from 'components/chatItem';
import Chatting from 'components/chatting';

registerComponent(Button);
registerComponent(Link);
registerComponent(ErrorComponent);
registerComponent(ControlledInput);
registerComponent(Input);
registerComponent(Layout);
registerComponent(Avatar);
registerComponent(ChatItem);
registerComponent(Chatting);

document.addEventListener('DOMContentLoaded', () => {
  const pathName = location.pathname;
  if (pathName === '/profile') {
    renderDOM(new ProfilePage({ title: 'Profile' }));
  } else if (pathName === '/chats') {
    renderDOM(new ChatsPage({ fullScreen: true }));
  } else if (pathName === '/signup') {
    renderDOM(new SignupPage({ title: 'Sign up' }));
  } else if (pathName === '/') {
    renderDOM(new LoginPage({ title: 'Sign in' }));
  } else {
    renderDOM(new ErrorPage({ status: 404, text: 'Page not found' }));
  }
});
