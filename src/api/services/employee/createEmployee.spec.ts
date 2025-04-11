import { createEmployee } from './createEmployee';

describe('createEmployee', () => {
  it('should create a employee', async () => {
    const employee = await createEmployee({
      name: 'John',
      status: 'Working',
    });

    expect(employee).toStrictEqual({
      id: 5,
      name: 'John',
      img: 'https://i.pravatar.cc/150?img=5',
      status: 'Working',
    });
  });

  it('should throw error when api error occurs', async () => {
    await expect(createEmployee({ name: 'bad-request', status: 'Working' })).rejects.toThrowError(
      'NETWORK_REQUEST_ERROR',
    );
  });
});
