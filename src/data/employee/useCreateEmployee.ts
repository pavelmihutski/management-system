import { useMutation } from '@tanstack/react-query';

import { createEmployee as createEmployeeRequest } from '@/api';

import { createEmployee as createEmployeeMutation } from './mutations';

export function useCreateEmployee() {
  const mutation = useMutation({
    mutationFn: createEmployeeRequest,
    onSuccess: createEmployeeMutation,
  });

  return { create: mutation.mutateAsync };
}
