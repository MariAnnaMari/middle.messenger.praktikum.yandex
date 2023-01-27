import { CoreRouter } from './CoreRouter';
export type Params = Record<string, string>;

const comparePath = (routName: string, pathName: string) => {
  const routNameArr = routName.split('/');
  const pathNameArr = pathName.split('/');
  if (routNameArr.length !== pathNameArr.length) {
    return false;
  }
  return routNameArr.every((item: string, index: number) => {
    if (item.startsWith(':')) {
      return true;
    }
    return item === pathNameArr[index];
  });
};

const getVariablesFromPath = (routName: string, pathName: string): Params => {
  const params: Params = {};
  const routNameArr = routName.split('/');
  const pathNameArr = pathName.split('/');
  routNameArr.forEach((item: string, index: number) => {
    if (!item.startsWith(':')) {
      return;
    }
    const paramName = item.substring(1);
    const paramVal = pathNameArr[index];
    params[paramName] = paramVal;
  });
  return params;
};

export class PathRouter implements CoreRouter {
  private routes: Record<string, () => void> = {};

  private isStarted = false;

  start() {
    if (!this.isStarted) {
      this.isStarted = true;

      window.onpopstate = (event: PopStateEvent) => {
        this.onRouteChange.call(this);
      };

      this.onRouteChange();
    }
  }

  private onRouteChange(pathname: string = window.location.pathname) {
    const found = Object.entries(this.routes).some(([routePath, callback]) => {
      if (comparePath(routePath, pathname)) {
        const params = getVariablesFromPath(routePath, pathname);
        callback(params);
        return true;
      }
      return false;
    });

    if (!found && this.routes['*']) {
      this.routes['*']();
    }
  }

  use(hash: string, callback: (params?: Params) => void) {
    this.routes[hash] = callback;
    return this;
  }

  go(pathname: string) {
    window.history.pushState({}, '', pathname);
    this.onRouteChange(pathname);
  }

  back() {
    window.history.back();
  }

  forward() {
    window.history.forward();
  }
}
