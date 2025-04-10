import { z } from 'zod';

import { EmployeeStatus, employeeStatuses, User } from '@/data';

import { UserSchema } from '../../schema';

type OxaUser = z.infer<typeof UserSchema>;

export function isEmployeeStatus(status: unknown): status is EmployeeStatus {
  return typeof status === 'string' && employeeStatuses.includes(status);
}

export const processUser = (user: OxaUser): User => {
  return {
    ...user,
    img: `https://i.pravatar.cc/150?img=${user.id}`,
    status: isEmployeeStatus(user.status) ? user.status : 'Working',
  };
};
