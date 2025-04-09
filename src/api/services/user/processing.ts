import { z } from 'zod';

import { User } from '@/data';

import { UserSchema } from '../../schema';

type OxaUser = z.infer<typeof UserSchema>;

export const processUser = (user: OxaUser): User => {
  return user;
};
