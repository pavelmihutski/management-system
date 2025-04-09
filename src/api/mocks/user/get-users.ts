import { PathParams } from 'msw';
import { http, HttpResponse } from 'msw';
import { z } from 'zod';

import { UserSchema } from '../../schema/user';
import usersList from './get-users-list-success.json';

type OxaUser = z.infer<typeof UserSchema>;

export const getUsers = http.get<PathParams, OxaUser[]>('/users', ({ request }) => {
  const url = new URL(request.url);
  const searchQuery = url.searchParams.get('search')?.toLowerCase() ?? '';

  const filteredUsers = usersList.filter(user => user.name.toLowerCase().includes(searchQuery));

  return HttpResponse.json(filteredUsers, { status: 200 });
});
