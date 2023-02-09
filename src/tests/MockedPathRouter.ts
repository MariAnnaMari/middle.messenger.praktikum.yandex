import { PathRouter } from 'core';

export class MockedPathRouter extends PathRouter {
  go(pathname: string) {
    window.history.pushState({}, '', pathname);
    // В NodeJS не срабатывает событие hashchange в JSDOM,
    // поэтому явно вызываем колбек смены роута
    this.onRouteChange();
  }
}
