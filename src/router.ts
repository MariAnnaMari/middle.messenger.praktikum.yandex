import { renderDOM, Store, PathRouter } from "core";
import { getScreenComponent, Screens } from 'helpers';

const routes = [
  {
    path: '/login',
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
    shouldAuthorized: false,
  },
  {
    path: '/messenger',
    block: Screens.Messenger,
    shouldAuthorized: false,
  },
];

export function initRouter(router: PathRouter, store: Store<AppState>) {
  routes.forEach((route) => {
    router.use(route.path, () => {
      const isAuthorized = Boolean(store.getState().user);
      const currentScreen = Boolean(store.getState().screen);
      if (isAuthorized || !route.shouldAuthorized) {
        store.dispatch({ screen: route.block });
        return;
      }

      if (!currentScreen) {
        store.dispatch({ screen: Screens.Login });
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
      renderDOM(new Page({}));
      document.title = `App / ${Page.componentName}`;
    }
  });
}
