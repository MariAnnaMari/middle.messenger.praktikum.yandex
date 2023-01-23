import { Block, Store } from 'core';
import { isEqual } from './isEqual';

type WithStateProps = { store: Store<AppState> };
type MapStateToProps<MappedProps> = (state: AppState) => MappedProps;

export function withStore<P extends WithStateProps, MappedProps = any>(
  WrappedBlock: Block<P>,
  mapStateToProps?: MapStateToProps<MappedProps>
) {
  // @ts-expect-error No base constructor has the specified
  return class extends WrappedBlock<P> {
    public static componentName =
      WrappedBlock.componentName || WrappedBlock.name;

    constructor(props: P) {
      super({ ...props, store: window.store });
      // if (typeof mapStateToProps === 'function') {
      //   super({ ...props, ...mapStateToProps(window.store.getState()) });
      // } else {
      //   super({ ...props, store: window.store });
      // }
    }

    __onChangeStoreCallback = (prevState: AppState, nextState: AppState) => {
      if (typeof mapStateToProps === 'function') {
        const prevPropsFromState = mapStateToProps(prevState);
        const nextPropsFromState = mapStateToProps(nextState);
        // if (isEqual(prevPropsFromState, nextPropsFromState)) {
        if (JSON.stringify(prevState) !== JSON.stringify(nextState)) {
          // @ts-expect-error this is not typed
          this.setProps(nextPropsFromState);
          return;
        }
      }
      /**
       * TODO: проверить что стор реально обновлен
       * и прокидывать не целый стор, а необходимые поля
       * с помощью метода mapStateToProps
       */
      // @ts-expect-error this is not typed
      // this.setProps({ ...this.props, store: window.store });
    };

    componentDidMount(props: P) {
      super.componentDidMount(props);
      window.store.on('changed', this.__onChangeStoreCallback);
    }

    componentWillUnmount() {
      super.componentWillUnmount();
      window.store.off('changed', this.__onChangeStoreCallback);
    }
  } as Block<Omit<P, 'store'>>;
}
