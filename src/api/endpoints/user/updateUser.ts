import { z } from 'zod';

import { request } from '../../request';
import { CreateUserSchema, UserSchema } from '../../schema';

type OxaUser = z.infer<typeof UserSchema>;
type OxaUpdateUserPayload = z.infer<typeof CreateUserSchema>;

export const updateUser = async (
  id: number,
  user: Partial<OxaUpdateUserPayload>,
): Promise<OxaUser> => {
  return request({
    url: `/users/${id}`,
    method: 'put',
    schema: UserSchema,
    config: { data: user },
  });
};
