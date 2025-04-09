import { fetchUsers } from '@/api';

import { queryClient } from '../queryClient';

export const queryKeys = {
  users: (searchValue?: string) => ['USERS', searchValue],
};

export function createUsersQueryOptions(searchValue?: string) {
  return {
    queryKey: queryKeys.users(searchValue),
    queryFn: () => fetchUsers(searchValue),
    staleTime: Infinity,
  };
}

export const fetchUsersQuery = () => {
  return queryClient.fetchQuery(createUsersQueryOptions());
};
