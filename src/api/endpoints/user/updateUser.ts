import { z } from 'zod';

import { request } from '../../request';
import { UserSchema } from '../../schema/user';

type OxaUser = z.infer<typeof UserSchema>;

export const updateUser = async (user: OxaUser) => {
  return request({
    url: `/users/${user.id}`,
    method: 'post',
    schema: UserSchema,
    config: { data: user },
  });
};
