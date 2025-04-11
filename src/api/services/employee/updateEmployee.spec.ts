import { updateEmployee } from './updateEmployee';

describe('updateEmployee', () => {
  it('should update a employee', async () => {
    const employee = await updateEmployee(1, {
      name: 'Updated John',
      status: 'inactive',
      img: 'https://example.com/image.png',
    });

    expect(employee).toStrictEqual({
      id: 1,
      img: 'https://i.pravatar.cc/150?img=1',
      name: 'Updated John',
      status: 'Working',
    });
  });

  it('should throw error when api error occurs', async () => {
    await expect(updateEmployee(1, { name: 'bad-request' })).rejects.toThrowError('NETWORK_REQUEST_ERROR');
  });
});
