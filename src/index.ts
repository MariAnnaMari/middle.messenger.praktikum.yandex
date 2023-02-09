import { registerComponent, Block, PathRouter } from 'core';
import { Store } from 'core/Store';
import './styles/app.css';
import { defaultState } from './store';
import type { PropsType } from 'core/Block';
import { initApp } from 'services/initApp';
import { initRouter } from './router';

import * as components from './components';
Object.values(components).forEach((Component: Block<PropsType>) => {
  registerComponent(Component);
});


document.addEventListener('DOMContentLoaded', () => {
  const store = new Store<AppState>(defaultState);
  const router = new PathRouter();

  /**
   * Помещаем роутер и стор в глобальную область для доступа в хоках with*
   * @warning Не использовать такой способ на реальный проектах
   */
  window.router = router;
  window.store = store;

  // renderDOM(new ChatsPage());

  store.on('changed', (prevState, nextState) => {
    console.log(
      '%cstore updated',
      'background: #222; color: #bada55',
      nextState
    );
  });

  /**
   * Инициализируем роутер
   */
  initRouter(router, store);

  /**
   * Загружаем данные для приложения
   */
  store.dispatch(initApp);
});
