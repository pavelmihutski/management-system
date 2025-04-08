import { fetchUser } from '@/api';

export const queryKeys = {
  users: ['USERS'],
};

export function createUserQueryOptions() {
  return {
    queryKey: queryKeys.users,
    queryFn: fetchUser,
    staleTime: Infinity,
  };
}
