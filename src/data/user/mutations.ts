import { queryClient } from '../queryClient';
import { queryKeys } from './queries';
import { User } from './types';

export function createUser(user: User) {
  queryClient.invalidateQueries({ queryKey: ['USERS'] });

  return queryClient.setQueryData<Array<User>>(queryKeys.users(), data => {
    if (!data) {
      return [user];
    }

    return [...data, user];
  });
}

export function updateUser(user: User) {
  return queryClient.setQueryData<Array<User>>(queryKeys.users(), data => {
    if (!data) {
      return;
    }

    return data.map(item => (item.id === user.id ? user : item));
  });
}
