import { useMutation } from '@tanstack/react-query';

import { updateEmployee as updateEmployeeRequest } from '@/api';

import { updateEmployee as updateEmployeeMutation } from './mutations';
import { Employee } from './types';

type UpdateEmployee = Partial<Employee> & { id: number };

export function useUpdateEmployee() {
  const mutation = useMutation({
    mutationFn: (employee: UpdateEmployee) => updateEmployeeRequest(employee.id, employee),
    onSuccess: updateEmployeeMutation,
  });

  return { update: mutation.mutateAsync };
}
