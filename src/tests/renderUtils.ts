import { Block, renderDOM, registerComponent, Store } from 'core';
import { defaultState } from 'store';
import * as components from 'components';
import { initRouter } from '../router';
import { MockedPathRouter } from 'tests/MockedPathRouter';
import { sleep } from 'helpers/sleep';
import { PropsType } from 'core/Block';

type RenderBlockParams = {
  Block: Block<PropsType>;
  props: PropsType;
  state?: Partial<AppState>;
};

export async function renderBlock<PropsType>({
  Block,
  props,
  state = defaultState,
}: RenderBlockParams) {
  Object.values(components).forEach((Component: any) => {
    registerComponent(Component);
  });

  const store = new Store<AppState>({ ...defaultState, ...state });
  const router = new MockedPathRouter();

  window.router = router;
  window.store = store;

  document.body.innerHTML = '<div id="app"></div>';

  renderDOM(new Block<PropsType>(props as PropsType));

  initRouter(router, store);

  /**
   * Ждем вызова componentDidMount,
   * медота жизненного цикла компонента,
   * который вызывается через 100мс в Block.getContent
   */
  // await sleep();
}

export async function step(name: string, callback: () => void) {
  console.log(`Step: ${name}`);
  await callback();
}
