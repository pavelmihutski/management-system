import { http, HttpResponse, PathParams } from 'msw';
import { z } from 'zod';

import { CreateUserSchema, UserSchema } from '../schema/user';

type OxaUser = z.infer<typeof UserSchema>;
type OxaCreateUser = z.infer<typeof CreateUserSchema>;

const employees: OxaUser[] = [
  { id: 1, name: 'John', status: 'Working', img: 'example1' },
  { id: 2, name: 'Jack', status: 'Working', img: 'example2' },
  { id: 3, name: 'Sheli', status: 'Working', img: 'example3' },
  { id: 4, name: 'Eitan', status: 'Working', img: 'example4' },
];

export const userHandlers = [
  http.get<PathParams, OxaUser[]>('/users', () => {
    return HttpResponse.json(employees, { status: 200 });
  }),

  http.post<PathParams, OxaCreateUser>('/users', async ({ request }) => {
    const body = await request.json();

    const newUser: OxaUser = {
      id: employees.length + 1,
      ...body,
    };

    employees.push(newUser);
    return HttpResponse.json(employees, { status: 201 });
  }),

  http.post<PathParams, OxaUser>('/users/:id', async ({ request, params }) => {
    const { id } = params;
    const { status } = await request.json();

    const index = employees.findIndex(emp => emp.id === Number(id));
    if (index !== -1) {
      employees[index].status = status;
    }

    return HttpResponse.json(employees, { status: 200 });
  }),
];
