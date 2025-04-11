import { z } from 'zod';

import { updateEmployee as updateEmployeeRequest } from '@/api/endpoints';
import { EmployeeSchema } from '@/api/schema/employee';
import { Employee } from '@/data';

import { processEmployee } from './processing';

type OxaEmployee = z.infer<typeof EmployeeSchema>;

export const updateEmployee = async (id: number, employee: Partial<OxaEmployee>): Promise<Employee> => {
  const response = await updateEmployeeRequest(id, employee);

  return processEmployee(response);
};
