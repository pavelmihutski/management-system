import { z } from 'zod';

import { request } from '../../request';
import { CreateUserSchema, UserSchema } from '../../schema/user';

type OxCreateUserPayload = z.infer<typeof CreateUserSchema>;

export const createUser = async (payload: OxCreateUserPayload) => {
  return request({
    url: '/users',
    method: 'post',
    schema: UserSchema,
    config: { data: payload },
  });
};
