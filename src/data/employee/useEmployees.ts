import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';

import { createEmployeesQueryOptions } from './queries';

export function useEmployees(searchValue?: string) {
  const { data, isLoading, error } = useQuery(createEmployeesQueryOptions(searchValue));

  const employees = useMemo(() => {
    if (!data) {
      return [];
    }

    return data;
  }, [data]);

  return { data: employees, isLoading, error };
}
