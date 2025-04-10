import { z } from 'zod';

import { createUser as createUserRequest } from '@/api/endpoints';
import { UserSchema } from '@/api/schema/user';
import { User } from '@/data';

import { processUser } from './processing';

type CreateUser = Omit<z.infer<typeof UserSchema>, 'id'>;

export const createUser = async (user: Partial<CreateUser>): Promise<User> => {
  const response = await createUserRequest(user);

  return processUser(response);
};
