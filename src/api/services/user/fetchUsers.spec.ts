import { fetchUsers } from './fetchUsers';

describe('fetchUsers', () => {
  it('should fetch user', async () => {
    const users = await fetchUsers();

    expect(users).toHaveLength(4);

    expect(users[0]).toStrictEqual({
      id: 1,
      name: 'John',
      status: 'Working',
      img: 'example1',
    });
  });

  it('should fetch user with search query', async () => {
    const users = await fetchUsers('John');

    expect(users).toHaveLength(1);
  });
});
