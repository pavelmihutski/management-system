import { z } from 'zod';

import { request } from '../../request';
import { CreateUserSchema, UserSchema } from '../../schema';

type OxaCreateUserPayload = z.infer<typeof CreateUserSchema>;
type OxaCreateUser = z.infer<typeof UserSchema>;

export const createUser = async (payload: Partial<OxaCreateUserPayload>): Promise<OxaCreateUser> => {
  return request({
    url: '/users',
    method: 'post',
    schema: UserSchema,
    config: { data: payload },
  });
};
