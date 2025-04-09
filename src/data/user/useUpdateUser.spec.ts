import { act, renderHook } from '@testing-library/react';

import { AllProviders } from '@/app/providers';

import { queryClient } from '../queryClient';
import { fetchUsersQuery, queryKeys } from './queries';
import { User } from './types';
import { useUpdateUser } from './useUpdateUser';

describe('useUpdateUser', () => {
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

  it('should update a user', async () => {
    const { result } = renderHook(() => useUpdateUser(), {
      wrapper: AllProviders,
    });

    await fetchUsersQuery();

    const users = queryClient.getQueryData<User[]>(queryKeys.users());

    expect(users).toHaveLength(4);

    await act(async () => {
      await result.current.update({
        id: 1,
        status: 'Working',
      });
    });

    const updatedUsers = queryClient.getQueryData<User[]>(queryKeys.users());

    expect(updatedUsers).toHaveLength(4);

    expect(updatedUsers && updatedUsers[0].status).toBe('Working');
  });

  it('should throw error when error occurs', async () => {
    const { result } = renderHook(() => useUpdateUser(), {
      wrapper: AllProviders,
    });

    const users = queryClient.getQueryData<User[]>(queryKeys.users());

    expect(users).toBeUndefined();

    await act(async () => {
      await expect(result.current.update({ id: 1, name: 'bad-request' })).rejects.toThrowError('NETWORK_REQUEST_ERROR');
    });

    const updatedUsers = queryClient.getQueryData<User[]>(queryKeys.users());

    expect(updatedUsers).toBeUndefined();
  });
});
