import { PathRouter } from 'core';

export class MockedPathRouter extends PathRouter {
  go(hash: string) {
    window.location.hash = hash;

    // В NodeJS не срабатывает событие hashchange в JSDOM,
    // поэтому явно вызываем колбек смены роута
    this.onRouteChange();
  }
}
