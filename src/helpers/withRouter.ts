import { Block } from 'core';
import { CoreRouter } from 'core/router/CoreRouter';

type WithRouterProps = { router: CoreRouter };

export function withRouter<P extends WithRouterProps>(WrappedBlock: Block<P>) {
  // @ts-expect-error No base constructor has the specified number of type arguments
  return class extends WrappedBlock<P> {
    public static componentName =
      WrappedBlock.componentName || WrappedBlock.name;

    constructor(props: P) {
      super({ ...props, router: window.router });
    }
  } as Block<Omit<P, 'router'>>;
}
