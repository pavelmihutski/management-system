import { act, renderHook } from '@testing-library/react';
import { waitFor } from '@testing-library/react';

import { AllProviders } from '@/app/providers';

import { queryClient } from '../queryClient';
import { queryKeys } from './queries';
import { Employee } from './types';
import { useCreateEmployee } from './useCreateEmployee';
import { useEmployees } from './useEmployees';

describe('integration', () => {
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

  it('should update employees when new search value is provided', async () => {
    const { result } = renderHook(() => useEmployees(), {
      wrapper: AllProviders,
    });

    expect(result.current.error).toBeNull();
    expect(result.current.isLoading).toBe(true);
    expect(result.current.data).toHaveLength(0);

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.error).toBeNull();
    expect(result.current.data).toHaveLength(4);

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    const { result: result2 } = renderHook(() => useEmployees('John'), {
      wrapper: AllProviders,
    });

    expect(result2.current.isLoading).toBe(true);

    await waitFor(() => {
      expect(result2.current.isLoading).toBe(false);
    });

    expect(result2.current.error).toBeNull();
    expect(result2.current.data).toHaveLength(1);
  });

  it('should update employees when a new employee is created', async () => {
    const { result } = renderHook(() => useEmployees(), {
      wrapper: AllProviders,
    });

    expect(result.current.error).toBeNull();
    expect(result.current.isLoading).toBe(true);
    expect(result.current.data).toHaveLength(0);

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.error).toBeNull();
    expect(result.current.data).toHaveLength(4);

    const { result: createResult } = renderHook(() => useCreateEmployee(), {
      wrapper: AllProviders,
    });

    await act(async () => {
      await createResult.current.create({
        name: 'John',
        status: 'active',
      });
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.data).toHaveLength(5);
  });

  it('should refetch employees if it was previously cached when creating a new employee with the same name', async () => {
    const { result } = renderHook(() => useEmployees('test'), {
      wrapper: AllProviders,
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.data).toHaveLength(0);

    const { result: createResult } = renderHook(() => useCreateEmployee(), {
      wrapper: AllProviders,
    });

    await act(async () => {
      await createResult.current.create({
        name: 'test',
        status: 'active',
      });
    });

    const employees = queryClient.getQueryData<Array<Employee>>(queryKeys.employees());

    expect(employees).toHaveLength(1);
  });
});
