import { fetchEmployees } from '@/api';

import { queryClient } from '../queryClient';

export const queryKeys = {
  employees: (searchValue?: string) => ['EMPLOYEES', searchValue ?? ''],
};

export function createEmployeesQueryOptions(searchValue?: string) {
  return {
    queryKey: queryKeys.employees(searchValue),
    queryFn: () => fetchEmployees(searchValue),
    staleTime: Infinity,
  };
}

export const fetchEmployeesQuery = () => {
  return queryClient.fetchQuery(createEmployeesQueryOptions());
};
