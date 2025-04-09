import { createUser } from './createUser';

describe('createUser', () => {
  it('should create a user', async () => {
    const user = await createUser({
      name: 'John',
      status: 'active',
      img: 'https://example.com/image.png',
    });

    expect(user).toStrictEqual({
      id: 5,
      img: 'https://example.com/image.png',
      name: 'John',
      status: 'active',
    });
  });

  it('should throw error when api error occurs', async () => {
    await expect(createUser({ name: 'bad-request' })).rejects.toThrowError('NETWORK_REQUEST_ERROR');
  });
});
