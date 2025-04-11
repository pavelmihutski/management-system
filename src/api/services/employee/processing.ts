import { z } from 'zod';

import { Employee, EmployeeStatus, employeeStatuses } from '@/data';

import { EmployeeSchema } from '../../schema';

type OxaEmployee = z.infer<typeof EmployeeSchema>;

export function isEmployeeStatus(status: unknown): status is EmployeeStatus {
  return typeof status === 'string' && employeeStatuses.includes(status);
}

export const processEmployee = (employee: OxaEmployee): Employee => {
  return {
    ...employee,
    img: `https://i.pravatar.cc/150?img=${employee.id}`,
    status: isEmployeeStatus(employee.status) ? employee.status : 'Working',
  };
};
