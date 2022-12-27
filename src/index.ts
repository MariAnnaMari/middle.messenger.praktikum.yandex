import { renderDOM, registerComponent, Block } from './core';
import LoginPage from 'pages/login';
import SignupPage from 'pages/signup';

import './styles/app.css';

import Button from 'components/button';
import Link from 'components/link';
import Input from 'components/input';
import ControlledInput from 'components/controlledInput';
import ErrorComponent from 'components/error';
import Layout from 'components/layout';

registerComponent(Button);
registerComponent(Link);
registerComponent(ErrorComponent);
registerComponent(ControlledInput);
registerComponent(Input);
registerComponent(Layout);

document.addEventListener('DOMContentLoaded', () => {
  // DEV: Расскоментировать нужно страницу для отображения

  class MyComponent extends Block {
    render(): string {
      return `<div>MyComponent</div>`;
    }
  }

  const App = new SignupPage({ title: 'Sign uphg' });

  renderDOM(App);
});
