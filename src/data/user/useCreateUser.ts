import { useMutation } from '@tanstack/react-query';

import { createUser as createUserRequest } from '@/api';

import { createUser as createUserMutation } from './mutations';

export function useCreateUser() {
  const mutation = useMutation({
    mutationFn: createUserRequest,
    onSuccess: createUserMutation,
  });

  return { create: mutation.mutateAsync };
}
