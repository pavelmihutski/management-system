import { fetchUser } from './fetchUser';

describe('fetchUser', () => {
  it('should fetch user', async () => {
    const user = await fetchUser();

    expect(user).toHaveLength(4);

    expect(user[0]).toStrictEqual({
      id: 1,
      name: 'John',
      status: 'Working',
      img: 'example1',
    });
  });
});
