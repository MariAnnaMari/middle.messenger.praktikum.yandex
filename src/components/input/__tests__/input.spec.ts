import { renderBlock } from 'tests/renderUtils';
import { getByTestId, prettyDOM } from '@testing-library/dom';
import { Input } from '../input';

describe('components/Input', () => {
  // ЮНИТ-тест на UI компонент
  it('should render Input', () => {
    renderBlock({
      Block: Input,
      props: {
        dataTestId: 'test-input',
        name: 'test',
        value: 'test',
        type: 'text',
      },
    });
    const input = getByTestId(document.body, 'test-input');
    expect(input).toBeInTheDocument();
  });

  // ЮНИТ-тест на UI компонент с событием
  it('should call onFocus when user focuses on input', () => {
    // 1 Arrange
    const mock = jest.fn();

    renderBlock({
      Block: Input,
      props: {
        dataTestId: 'test-input',
        name: 'test',
        value: 'test',
        type: 'text',
        onFocus: mock,
      },
    });

    // 2 Act
    getByTestId(document.body, 'test-input').focus();

    // 3 Assert
    expect(mock).toBeCalled();
  });
});
