import HttpTransport from '../HttpTransport';
import { authAPI } from '../auth';

describe('api/auth', () => {
  const testRequest = new HttpTransport();
  // ЮНИТ-ТЕСТ
  it('Checking login', async () => {
    try {
      await authAPI.login({ login: '', password: '' });
    } catch (err) {
      const reason = JSON.parse(err).reason;
      expect(reason).toEqual('Login or password is incorrect');
    }
  });

  // ЮНИТ-ТЕСТ DOM
  it('Checking get user info', async () => {
    try {
      const response = await authAPI.me();
      expect(response.status).toEqual(200);
    } catch (err) {}
  });
});
