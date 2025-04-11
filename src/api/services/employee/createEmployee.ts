import { z } from 'zod';

import { createEmployee as createEmployeeRequest } from '@/api/endpoints';
import { EmployeeSchema } from '@/api/schema/employee';
import { Employee } from '@/data/employee';

import { processEmployee } from './processing';

type CreateEmployee = Omit<z.infer<typeof EmployeeSchema>, 'id' | 'img'>;

export const createEmployee = async (employee: CreateEmployee): Promise<Employee> => {
  const response = await createEmployeeRequest(employee);

  return processEmployee(response);
};
