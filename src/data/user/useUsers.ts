import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';

import { createUserQueryOptions } from './queries';

export function useUsers() {
  const { data, isLoading, error } = useQuery(createUserQueryOptions());

  const users = useMemo(() => {
    if (!data) {
      return [];
    }

    return data;
  }, [data]);

  return { data: users, isLoading, error };
}
