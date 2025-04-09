import { act, renderHook } from '@testing-library/react';

import { AllProviders } from '@/app/providers';

import { queryClient } from '../queryClient';
import { fetchUsersQuery, queryKeys } from './queries';
import { User } from './types';
import { useCreateUser } from './useCreateUser';

describe('useCreateUser', () => {
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

  it('should create a user', async () => {
    const { result } = renderHook(() => useCreateUser(), {
      wrapper: AllProviders,
    });

    await fetchUsersQuery();

    const users = queryClient.getQueryData<User[]>(queryKeys.users());

    expect(users).toHaveLength(4);

    await act(async () => {
      await result.current.create({
        name: 'John',
        status: 'active',
        img: 'https://example.com/image.png',
      });
    });

    const updatedUsers = queryClient.getQueryData<User[]>(queryKeys.users());

    expect(updatedUsers).toHaveLength(5);
  });

  it('should throw error when error occurs', async () => {
    const { result } = renderHook(() => useCreateUser(), {
      wrapper: AllProviders,
    });

    const users = queryClient.getQueryData<User[]>(queryKeys.users());

    expect(users).toBeUndefined();

    await act(async () => {
      await expect(result.current.create({ name: 'bad-request' })).rejects.toThrowError('NETWORK_REQUEST_ERROR');
    });

    const updatedList = queryClient.getQueryData<User[]>(queryKeys.users());

    expect(updatedList).toBeUndefined();
  });
});
