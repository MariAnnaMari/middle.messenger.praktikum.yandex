import { PathRouter } from '../router/PathRouter';

describe('core/PathRouter', () => {
  test('check router go', () => {
    const router = new PathRouter();
    router.go('/messenger');
    expect(window.location.pathname).toStrictEqual('/messenger');
  });

  it('check router back', () => {
    const router = new PathRouter();
    router.go('/login');
    router.back()
    expect(window.location.pathname).toStrictEqual('/login');
  });

  it('check router use', () => {
    // 1 Arrange
    const router = new PathRouter();
    const mock = jest.fn();
    router.use('/messenger', mock);

    // 2 Act
    router.go('/messenger');

    // 3 Assert
    expect(mock).toHaveBeenCalled();
  });
});
