import { useMutation } from '@tanstack/react-query';

import { updateUser as updateUserRequest } from '@/api';

import { updateUser as updateUserMutation } from './mutations';
import { User } from './types';

type UpdateUser = Partial<User> & { id: number };

export function useUpdateUser() {
  const mutation = useMutation({
    mutationFn: (user: UpdateUser) => updateUserRequest(user.id, user),
    onSuccess: updateUserMutation,
  });

  return { update: mutation.mutateAsync };
}
