import { delay, http, HttpResponse } from 'msw';
import { PathParams } from 'msw';
import { z } from 'zod';

import { CreateUserSchema, UserSchema } from '../../schema/user';
import usersList from './get-users-list-success.json';

type OxaUser = z.infer<typeof UserSchema>;
type OxaCreateUser = z.infer<typeof CreateUserSchema>;

const schemas = [
  {
    match: ({ name }: OxaCreateUser) => name === 'bad-request',
    getResponse: () => new HttpResponse('Bad Request', { status: 400 }),
  },
];

export const createUser = http.post<PathParams, OxaCreateUser>('/users', async ({ request }) => {
  const body = await request.json();

  const schema = schemas.find(schema => schema.match(body));

  await delay();

  if (schema) {
    return schema.getResponse();
  }

  const newUser: OxaUser = {
    id: usersList.length + 1,
    ...body,
    img: `https://i.pravatar.cc/150?img=${usersList.length + 1}`,
  };

  usersList.push(newUser);

  return HttpResponse.json(newUser, { status: 201 });
});
