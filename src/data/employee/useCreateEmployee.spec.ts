import { act, renderHook } from '@testing-library/react';

import { AllProviders } from '@/app/providers';

import { queryClient } from '../queryClient';
import { fetchEmployeesQuery, queryKeys } from './queries';
import { Employee } from './types';
import { useCreateEmployee } from './useCreateEmployee';

describe('useCreateEmployee', () => {
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

  it('should create an employee', async () => {
    const { result } = renderHook(() => useCreateEmployee(), {
      wrapper: AllProviders,
    });

    await fetchEmployeesQuery();

    const employees = queryClient.getQueryData<Employee[]>(queryKeys.employees());

    expect(employees).toHaveLength(4);

    await act(async () => {
      await result.current.create({
        name: 'John',
        status: 'active',
      });
    });

    const updatedEmployees = queryClient.getQueryData<Employee[]>(queryKeys.employees());

    expect(updatedEmployees).toHaveLength(5);
  });

  it('should throw error when error occurs', async () => {
    const { result } = renderHook(() => useCreateEmployee(), {
      wrapper: AllProviders,
    });

    const employees = queryClient.getQueryData<Employee[]>(queryKeys.employees());

    expect(employees).toBeUndefined();

    await act(async () => {
      await expect(result.current.create({ name: 'bad-request', status: 'active' })).rejects.toThrowError(
        'NETWORK_REQUEST_ERROR',
      );
    });

    const updatedList = queryClient.getQueryData<Employee[]>(queryKeys.employees());

    expect(updatedList).toBeUndefined();
  });
});
