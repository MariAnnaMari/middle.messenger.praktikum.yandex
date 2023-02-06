import Block, { Events } from 'core/Block';
import EventBus from '../EventBus';

describe('core/Block', () => {
  // ЮНИТ-ТЕСТ на модуль
  it.skip('check set props', () => {
    const block = new Block({ title: 'test' });
    block._createResources();
    block.setProps({ title: 'new title' });
    expect(block?.props?.title).toEqual('new title');
  });

  // ЮНИТ-ТЕСТ на тестирования события
  it('should emit event FLOW_CDU after props was update', () => {
    const EVENTS_LIST = {
      INIT: 'init',
      FLOW_CDM: 'flow:component-did-mount',
      FLOW_CDU: 'flow:component-did-update',
      FLOW_RENDER: 'flow:render',
    };
    // 1 Arrange
    const block = new Block({ title: 'test' });
    block._createResources();
    const eventBus = new EventBus<Events>();
    block._registerEvents(eventBus);
    const mock = jest.fn();
    block.eventBus().on(EVENTS_LIST.FLOW_CDU, mock);

    // 2 Act
    block.setProps({ title: 'new title' });

    // 3 Assert
    expect(mock).toHaveBeenCalled();
    expect(mock).toHaveBeenCalledTimes(1);
    expect(mock).toHaveBeenCalledWith({ title: 'test' }, { title: 'new title' });
  });
});
