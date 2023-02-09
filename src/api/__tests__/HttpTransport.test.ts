import HttpTransport from '../HttpTransport';

describe('api/HttpTransport', () => {
  const testRequest = new HttpTransport();
  // ЮНИТ-ТЕСТ
  it('Checking the error response', async () => {
    try {
      await testRequest.post('auth/signin', {
        data: { login: '', password: '' },
      });
    } catch (err) {
      const reason = JSON.parse(err).reason;
      expect(reason).toEqual('Login or password is incorrect');
    }
  });

  // ЮНИТ-ТЕСТ DOM
  it('Checking the success response', async () => {
    await testRequest.get('auth/user').then((response) => {
      expect(response.status).toEqual(200);
    });
  });
});
