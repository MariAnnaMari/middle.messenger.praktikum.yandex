import { renderDOM, Store, PathRouter } from 'core';
import { getScreenComponent, Screens } from 'helpers';
import { Params } from 'core/router/PathRouter';

const routes = [
  {
    path: '/login',
    block: Screens.Login,
    shouldAuthorized: false,
  },
  {
    path: '/login/:id',
    block: Screens.Login,
    shouldAuthorized: false,
  },
  {
    path: '/sign-up',
    block: Screens.SignUp,
    shouldAuthorized: false,
  },
  {
    path: '/setting',
    block: Screens.Profile,
    shouldAuthorized: true,
  },
  {
    path: '/messenger',
    block: Screens.Messenger,
    shouldAuthorized: true,
  },
  {
    path: '/messenger/:id',
    block: Screens.Messenger,
    shouldAuthorized: true,
  },
  {
    path: '*',
    block: Screens.Login,
    shouldAuthorized: false,
  },
];

export function initRouter(router: PathRouter, store: Store<AppState>) {
  routes.forEach((route) => {
    router.use(route.path, (params?: Params) => {
      const isAuthorized = Boolean(store.getState().user);
      const currentScreen = Boolean(store.getState().screen);
      if ((route.path === '*' || route.path === '/login') && isAuthorized) {
        store.dispatch({ screen: Screens.Messenger, params: params });
        return;
      }
      if (isAuthorized || !route.shouldAuthorized) {
        store.dispatch({ screen: route.block, params: params });
        return;
      }
      if (!currentScreen) {
        store.dispatch({ screen: Screens.Login, params: params });
      }
    });
  });

  /**
   * Глобальный слушатель изменений в сторе
   * для переключения активного экрана
   */
  store.on('changed', (prevState, nextState) => {
    if (!prevState.appIsInited && nextState.appIsInited) {
      router.start();
    }
    if (prevState.screen !== nextState.screen) {
      const Page = getScreenComponent(nextState.screen);
      renderDOM(new Page({ params: nextState.params }));
      document.title = `App / ${Page.componentName}`;
    }
  });
}
