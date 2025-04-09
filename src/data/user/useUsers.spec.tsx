import { renderHook, waitFor } from '@testing-library/react';

import { AllProviders } from '@/app/providers';

import { queryClient } from '../queryClient';
import { useUsers } from './useUsers';

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

describe('useUsers', () => {
  it('should return the users', async () => {
    const { result } = renderHook(() => useUsers(), {
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

    expect(result.current.data[0]).toStrictEqual({
      id: 1,
      name: 'John',
      status: 'Working',
      img: 'example1',
    });
  });

  it('should return the users with the search value', async () => {
    const { result } = renderHook(() => useUsers(), {
      wrapper: AllProviders,
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    const { result: result2 } = renderHook(() => useUsers('John'), {
      wrapper: AllProviders,
    });

    await waitFor(() => {
      expect(result2.current.isLoading).toBe(false);
    });

    expect(result2.current.data).toHaveLength(1);

    expect(result.current.data[0]).toStrictEqual({
      id: 1,
      name: 'John',
      status: 'Working',
      img: 'example1',
    });
  });

  it('should return the empty array when the match is not found', async () => {
    const { result } = renderHook(() => useUsers('no-match'), {
      wrapper: AllProviders,
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.data).toHaveLength(0);
  });
});
