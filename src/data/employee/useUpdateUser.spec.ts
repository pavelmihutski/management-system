import { act, renderHook } from '@testing-library/react';

import { AllProviders } from '@/app/providers';

import { queryClient } from '../queryClient';
import { fetchEmployeesQuery, queryKeys } from './queries';
import { Employee } from './types';
import { useUpdateEmployee } from './useUpdateEmployee';

describe('useUpdateEmployee', () => {
  beforeEach(() => {
    vi.clearAllMocks();

    queryClient.clear();
  });

  beforeAll(() => {
    queryClient.setDefaultOptions({
      queries: {
        staleTime: 1 * 1000,
        gcTime: 1 * 1000,
      },
    });
  });

  afterAll(() => {
    queryClient.clear();
  });

  it('should update an employee', async () => {
    const { result } = renderHook(() => useUpdateEmployee(), {
      wrapper: AllProviders,
    });

    await fetchEmployeesQuery();

    const employees = queryClient.getQueryData<Array<Employee>>(queryKeys.employees());

    expect(employees).toHaveLength(4);

    await act(async () => {
      await result.current.update({
        id: 1,
        status: 'Working',
      });
    });

    const updatedEmployees = queryClient.getQueryData<Array<Employee>>(queryKeys.employees());

    expect(updatedEmployees).toHaveLength(4);

    expect(updatedEmployees && updatedEmployees[0].status).toBe('Working');
  });

  it('should throw error when error occurs', async () => {
    const { result } = renderHook(() => useUpdateEmployee(), {
      wrapper: AllProviders,
    });

    const employees = queryClient.getQueryData<Array<Employee>>(queryKeys.employees());

    expect(employees).toBeUndefined();

    await act(async () => {
      await expect(result.current.update({ id: 1, name: 'bad-request' })).rejects.toThrowError('NETWORK_REQUEST_ERROR');
    });

    const updatedEmployees = queryClient.getQueryData<Array<Employee>>(queryKeys.employees());

    expect(updatedEmployees).toBeUndefined();
  });
});
