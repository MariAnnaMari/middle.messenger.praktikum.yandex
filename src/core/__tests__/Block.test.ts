import Block, { Events } from 'core/Block';
import EventBus from '../EventBus';

describe('core/Block', () => {
  class testBlock extends Block<{ title: string }> {
    render() {
      return '<span></span>';
    }
  }
  // ЮНИТ-ТЕСТ на модуль
  it('check set props', () => {
    const block = new testBlock({ title: 'test' });
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
    const block = new testBlock({ title: 'test' });
    const eventBus = new EventBus<Events>();
    block._registerEvents(eventBus);
    const mock = jest.fn();
    block.eventBus().on(EVENTS_LIST.FLOW_CDU, mock);

    // 2 Act
    block.setProps({ title: 'new title' });

    // 3 Assert
    expect(mock).toHaveBeenCalled();
    expect(mock).toHaveBeenCalledTimes(1);
    expect(mock).toHaveBeenCalledWith(
      { title: 'test' },
      { title: 'new title' }
    );
  });
  // ЮНИТ-ТЕСТ DOM
  it('hide and show content', () => {
    const block = new testBlock({ title: 'test' });
    block.hide();
    expect(block.getContent().style.display).toStrictEqual('none');
    block.show();
    expect(block.getContent().style.display).toStrictEqual('block');
  });
});
