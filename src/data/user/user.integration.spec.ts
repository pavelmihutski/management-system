import { act, renderHook } from '@testing-library/react';
import { waitFor } from '@testing-library/react';

import { AllProviders } from '@/app/providers';

import { queryClient } from '../queryClient';
import { queryKeys } from './queries';
import { User } from './types';
import { useCreateUser } from './useCreateUser';
import { useUsers } from './useUsers';

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

  it('should update users when new search value is provided', async () => {
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

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    const { result: result2 } = renderHook(() => useUsers('John'), {
      wrapper: AllProviders,
    });

    expect(result2.current.isLoading).toBe(true);

    await waitFor(() => {
      expect(result2.current.isLoading).toBe(false);
    });

    expect(result2.current.error).toBeNull();
    expect(result2.current.data).toHaveLength(1);
  });

  it('should update users when a new user is created', async () => {
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

    const { result: createResult } = renderHook(() => useCreateUser(), {
      wrapper: AllProviders,
    });

    await act(async () => {
      await createResult.current.create({
        name: 'John',
        status: 'active',
        img: 'https://example.com/image.png',
      });
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.data).toHaveLength(5);
  });

  it('should refetch users if it was previously cached when creating a new user with the same name', async () => {
    const { result } = renderHook(() => useUsers('test'), {
      wrapper: AllProviders,
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.data).toHaveLength(0);

    const { result: createResult } = renderHook(() => useCreateUser(), {
      wrapper: AllProviders,
    });

    await act(async () => {
      await createResult.current.create({
        name: 'test',
        status: 'active',
        img: 'https://example.com/image.png',
      });
    });

    const users = queryClient.getQueryData<Array<User>>(queryKeys.users());

    expect(users).toHaveLength(1);
  });
});
