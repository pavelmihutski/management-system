import { z } from 'zod';

import { updateUser as updateUserRequest } from '@/api/endpoints';
import { UserSchema } from '@/api/schema/user';

import { processUser } from './processing';

type OxaUser = z.infer<typeof UserSchema>;

export const updateUser = async (id: number, user: Partial<OxaUser>): Promise<OxaUser> => {
  const response = await updateUserRequest(id, user);

  return processUser(response);
};
