import { PathParams } from 'msw';
import { http, HttpResponse } from 'msw';
import { z } from 'zod';

import { UserSchema } from '../../schema/user';
import usersList from './get-users-list-success.json';

type OxaUser = z.infer<typeof UserSchema>;

export const getUsers = http.get<PathParams, OxaUser[]>('/users', () => {
  return HttpResponse.json(usersList, { status: 200 });
});
