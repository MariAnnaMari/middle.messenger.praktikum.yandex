import { Button, ButtonProps } from '../button';
import { renderBlock } from 'tests/renderUtils';
import { getByRole, prettyDOM } from '@testing-library/dom';

function renderButton({ onClick, title }: ButtonProps) {
  renderBlock({
    Block: Button,
    props: { title: title, onClick },
  });

  return getByRole(document.body, 'button');
}

describe('components/Button', () => {
  // ЮНИТ-тест на UI компонент
  // могут называть интеграционным тестом, тк юзает renderBlock, Store
  it.skip('should render button', () => {
    const button = renderButton({
      title: 'test',
      onClick: (e: MouseEvent) => {
        console.log('onClick', e);
      },
    });
    expect(button).toBeInTheDocument();
  });

  // ЮНИТ-тест на UI компонент с событием
  it.skip('should call onClick when user press button', () => {
    // 1 Arrange
    const mock = jest.fn();

    renderBlock({
      Block: Button,
      props: { title: '123', onClick: mock },
    });

    // 2 Act
    getByRole(document.body, 'button').click();

    // 3 Assert
    expect(mock).toBeCalled();
  });
});
