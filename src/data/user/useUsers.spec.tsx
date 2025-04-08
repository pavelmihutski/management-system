import { renderHook, waitFor } from '@testing-library/react';

import { AllProviders } from '@/app/providers';

import { useUsers } from './useUsers';

afterAll(() => {
  vi.clearAllMocks();
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
});
