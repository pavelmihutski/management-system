import { z } from 'zod';

import { request } from '../../request';
import { UserListSchema, UserSchema } from '../../schema';

type OxaUser = z.infer<typeof UserSchema>;

type GetUsersParams = {
  search?: string;
};

export const getUsers = async ({ search }: GetUsersParams): Promise<Array<OxaUser>> => {
  return request({ url: '/users', schema: UserListSchema, config: { params: { search } } });
};
