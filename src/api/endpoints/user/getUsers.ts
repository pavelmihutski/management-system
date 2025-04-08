import { z } from 'zod';

import { request } from '../../request';
import { UserListSchema, UserSchema } from '../../schema';

type OxUser = z.infer<typeof UserSchema>;

export const getUsers = async (): Promise<Array<OxUser>> => {
  return request({ url: '/users', schema: UserListSchema });
};
