import { z } from 'zod';

import { UserSchema } from '../../schema/user';

type OxUser = z.infer<typeof UserSchema>;

export const processUser = (user: OxUser): OxUser => {
  return user;
};
