import {renderDOM, registerComponent, Block} from './core';

import './styles/app.css';

import Button from 'components/button';
import Link from 'components/link';
import Input from 'components/input';
import ControlledInput from 'components/controlledInput';
import ErrorComponent from 'components/error';
import Layout from 'components/layout';
import LoginPage from "./pages/login";

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

  const App = new LoginPage({ title: 'Sign in' });

  renderDOM(App);
});
