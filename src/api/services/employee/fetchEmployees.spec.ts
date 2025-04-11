import { fetchEmployees } from './fetchEmployees';

describe('fetchEmployees', () => {
  it('should fetch employee', async () => {
    const employees = await fetchEmployees();

    expect(employees).toHaveLength(4);

    expect(employees[0]).toStrictEqual({
      id: 1,
      name: 'John',
      status: 'Working',
      img: 'https://i.pravatar.cc/150?img=1',
    });
  });

  it('should fetch employee with search query', async () => {
    const employees = await fetchEmployees('John');

    expect(employees).toHaveLength(1);
  });
});
