import { HttpResponse, PathParams } from 'msw';
import { http } from 'msw';
import { z } from 'zod';

import { UserSchema } from '@/api/schema/user';

import usersList from './get-users-list-success.json';

type OxaUser = z.infer<typeof UserSchema>;

const schemas = [
  {
    match: ({ name }: OxaUser) => name === 'bad-request',
    getResponse: () => new HttpResponse('Bad Request', { status: 400 }),
  },
  {
    match: ({ name }: OxaUser) => name === 'success',
    getResponse: () => HttpResponse.json(usersList, { status: 200 }),
  },
];

export const updateUser = http.put<PathParams, OxaUser>(
  '/users/:id',
  async ({ request, params }) => {
    const { id } = params;
    const body = await request.json();

    const schema = schemas.find(schema => schema.match(body));

    if (schema) {
      return schema.getResponse();
    }

    const index = usersList.findIndex(user => user.id === Number(id));

    const updatedUser = { ...usersList[index], ...body };

    if (index !== -1) {
      usersList[index] = updatedUser;
    }

    return HttpResponse.json(updatedUser, { status: 200 });
  },
);
