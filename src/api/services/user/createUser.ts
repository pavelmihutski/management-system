import { z } from 'zod';

import { createUser as createUserRequest } from '@/api/endpoints';
import { UserSchema } from '@/api/schema/user';

import { processUser } from './processing';

type OxaUser = z.infer<typeof UserSchema>;
type CreateUser = Omit<OxaUser, 'id'>;

export const createUser = async (user: Partial<CreateUser>): Promise<OxaUser> => {
  const response = await createUserRequest(user);

  return processUser(response);
};
