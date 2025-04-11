import { z } from 'zod';

import { request } from '../../request';
import { EmployeeListSchema, EmployeeSchema } from '../../schema';

type OxaEmployee = z.infer<typeof EmployeeSchema>;

type GetEmployeesParams = {
  search?: string;
};

export const getEmployees = async ({ search }: GetEmployeesParams): Promise<Array<OxaEmployee>> => {
  return request({ url: '/employees', schema: EmployeeListSchema, config: { params: { search } } });
};
