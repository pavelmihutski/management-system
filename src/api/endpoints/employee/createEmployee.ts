import { z } from 'zod';

import { request } from '../../request';
import { CreateEmployeeSchema, EmployeeSchema } from '../../schema';

type OxaCreateEmployeePayload = z.infer<typeof CreateEmployeeSchema>;
type OxaCreateEmployee = z.infer<typeof EmployeeSchema>;

export const createEmployee = async (payload: Partial<OxaCreateEmployeePayload>): Promise<OxaCreateEmployee> => {
  return request({
    url: '/employees',
    method: 'post',
    schema: EmployeeSchema,
    config: { data: payload },
  });
};
