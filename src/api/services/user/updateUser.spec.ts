import { updateUser } from './updateUser';

describe('updateUser', () => {
  it('should update a user', async () => {
    const user = await updateUser(1, {
      name: 'Updated John',
      status: 'inactive',
      img: 'https://example.com/image.png',
    });

    expect(user).toStrictEqual({
      id: 1,
      img: 'https://example.com/image.png',
      name: 'Updated John',
      status: 'inactive',
    });
  });

  it('should throw error when api error occurs', async () => {
    await expect(updateUser(1, { name: 'bad-request' })).rejects.toThrowError('NETWORK_REQUEST_ERROR');
  });
});
