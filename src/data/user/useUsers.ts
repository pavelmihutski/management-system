import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';

import { createUsersQueryOptions } from './queries';

export function useUsers(searchValue?: string) {
  const { data, isLoading, error } = useQuery(createUsersQueryOptions(searchValue));

  const users = useMemo(() => {
    if (!data) {
      return [];
    }

    return data;
  }, [data]);

  return { data: users, isLoading, error };
}
