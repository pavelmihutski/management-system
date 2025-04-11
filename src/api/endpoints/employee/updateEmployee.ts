import { z } from 'zod';

import { request } from '../../request';
import { CreateEmployeeSchema, EmployeeSchema } from '../../schema';

type OxaEmployee = z.infer<typeof EmployeeSchema>;
type OxaUpdateEmployeePayload = z.infer<typeof CreateEmployeeSchema>;

export const updateEmployee = async (id: number, employee: Partial<OxaUpdateEmployeePayload>): Promise<OxaEmployee> => {
  return request({
    url: `/employees/${id}`,
    method: 'put',
    schema: EmployeeSchema,
    config: { data: employee },
  });
};
