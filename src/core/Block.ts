import EventBus from './EventBus';
import { nanoid } from 'nanoid';
import Handlebars from 'handlebars';

type Events = Values<typeof Block.EVENTS>;
export type PropsType = Partial<{ [key: string]: any }> | object | null;

export type StateType = { [key: string]: any } | object;

export default class Block<P extends PropsType> {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
  } as const;
  static componentName: string;
  public id = nanoid(6);

  protected _element: Nullable<HTMLElement | HTMLInputElement> = null;
  protected props: Readonly<P | PropsType>;

  protected children: { [id: string]: Block<PropsType> } = {};

  eventBus: () => EventBus<Events>;

  /**
   * @deprecated state Не использовать, использовать this.props
   **/
  protected state: PropsType = {};
  protected refs: { [key: string]: Block<PropsType> } = {};

  public constructor(props?: P | PropsType) {
    const eventBus = new EventBus<Events>();

    this.getStateFromProps(props);

    // this.props = this._makePropsProxy(props || ({} as P));
    this.props = props || ({} as P);
    this.state = this._makePropsProxy(this.state);


    this.eventBus = () => eventBus;

    this._registerEvents(eventBus);

    eventBus.emit(Block.EVENTS.INIT, this.props);
  }

  /**
   * Хелпер, который проверяет, находится ли элемент в DOM дереве
   * И есть нет, триггерит событие COMPONENT_WILL_UNMOUNT
   */
  _checkInDom() {
    const elementInDOM = document.body.contains(this._element);

    if (elementInDOM) {
      setTimeout(() => this._checkInDom(), 1000);
      return;
    }

    this.eventBus().emit(Block.EVENTS.FLOW_CWU, this.props);
  }

  _registerEvents(eventBus: EventBus<Events>) {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  _createResources() {
    this._element = this._createDocumentElement('div');
  }

  /**
   * @deprecated state Не использовать, использовать this.props
   **/
  protected getStateFromProps(props?: P | PropsType): void {
    this.state = {};
  }

  init() {
    this._createResources();
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER, this.props);
  }

  _componentDidMount(props: P) {
    this._checkInDom();
    this.componentDidMount(props);
  }

  componentDidMount(props: P) {
    // console.log('componentDidMount');
  }

  _componentDidUpdate(oldProps: P, newProps: P) {
    const response = this.componentDidUpdate(oldProps, newProps);
    if (!response) {
      return;
    }
    this._render();
  }

  componentDidUpdate(oldProps: P, newProps: P) {
    return true;
  }

  setProps = (nextPartialProps: Partial<P>) => {
    if (!nextPartialProps) {
      return;
    }
    const prevProps = this.props;
    const nextProps = { ...prevProps, ...nextPartialProps };
    this.props = nextProps;

    this.eventBus().emit(Block.EVENTS.FLOW_CDU, prevProps, nextProps);
    // Object.assign(this.props && this.props, nextProps);
  };

  setState = (nextState: PropsType) =>{
    if (!nextState) {
      return;
    }

    Object.assign(this.state, nextState);
  };

  get element() {
    return this._element as HTMLElement;
  }

  get inputElement() {
    return this._element as HTMLInputElement;
  }

  _render() {
    const fragment = this._compile();

    this._removeEvents();
    const newElement = fragment.firstElementChild!;

    this._element!.replaceWith(newElement);

    this._element = newElement as HTMLElement;
    this._addEvents();
  }

  protected render(): string {
    return '';
  }

  getContent(): HTMLElement {
    // Хак, чтобы вызвать CDM только после добавления в DOM
    if (this.element?.parentNode?.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
      setTimeout(() => {
        if (
          this.element?.parentNode?.nodeType !== Node.DOCUMENT_FRAGMENT_NODE
        ) {
          this.eventBus().emit(Block.EVENTS.FLOW_CDM);
        }
      }, 100);
    }

    return this.element!;
  }

  _makePropsProxy(props: PropsType) {
    return new Proxy(props as unknown as object, {
      get: (target: Record<string, unknown>, prop: string) => {
        const value = target[prop];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set: (target: Record<string, unknown>, prop: string, value: unknown) => {
        const oldTarget = { ...target };
        target[prop] = value;
        if (
          typeof oldTarget[prop] !== 'function' &&
          JSON.stringify(oldTarget[prop]) !== JSON.stringify(value)
        ) {
          this.eventBus().emit(Block.EVENTS.FLOW_CDU, oldTarget, target);
        }
        return true;
      },
      deleteProperty: () => {
        throw new Error('Нет доступа');
      },
    }) as unknown as PropsType;
  }
  _makeStateProxy(props: StateType) {
    return new Proxy(props as unknown as object, {
      get: (target: Record<string, unknown>, prop: string) => {
        const value = target[prop];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set: (target: Record<string, unknown>, prop: string, value: unknown) => {
        target[prop] = value;

        this.eventBus().emit(Block.EVENTS.FLOW_CDU, { ...target }, target);
        return true;
      },
      deleteProperty: () => {
        throw new Error('Нет доступа');
      },
    }) as unknown as StateType;
  }

  _createDocumentElement(tagName: string) {
    return document.createElement(tagName);
  }

  _removeEvents() {
    const events: Record<string, () => void> = (this.props as P)?.events;

    if (!events || !this._element) {
      return;
    }

    Object.entries(events).forEach(([event, listener]) => {
      this._element!.removeEventListener(event, listener);
    });
  }

  _addEvents() {
    const events: Record<string, () => void> = (this.props as P)?.events;

    if (!events) {
      return;
    }

    Object.entries(events).forEach(([event, listener]) => {
      this._element!.addEventListener(event, listener);
    });
  }

  _compile(): DocumentFragment {
    const fragment = document.createElement('template');

    /**
     * Рендерим шаблон
     */
    const template = Handlebars.compile(this.render());
    fragment.innerHTML = template({
      ...this.state,
      ...this.props,
      children: this.children,
      refs: this.refs,
    });

    /**
     * Заменяем заглушки на компоненты
     */
    Object.entries(this.children).forEach(([id, component]) => {
      /**
       * Ищем заглушку по id
       */
      const stub = fragment.content.querySelector(`[data-id="${id}"]`);

      if (!stub) {
        return;
      }

      const stubChilds = stub.childNodes.length ? stub.childNodes : [];

      /**
       * Заменяем заглушку на component._element
       */
      const content = component.getContent();
      stub.replaceWith(content);

      /**
       * Ищем элемент layout-а, куда вставлять детей
       */
      const layoutContent = content.querySelector('[data-layout="1"]');

      if (layoutContent && stubChilds.length) {
        layoutContent.append(...stubChilds);
      }
    });

    /**
     * Возвращаем фрагмент
     */
    return fragment.content;
  }

  show() {
    this.getContent().style.display = 'block';
  }

  hide() {
    this.getContent().style.display = 'none';
  }
}
