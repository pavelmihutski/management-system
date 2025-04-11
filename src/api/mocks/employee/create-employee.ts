import { delay, http, HttpResponse } from 'msw';
import { PathParams } from 'msw';
import { z } from 'zod';

import { CreateEmployeeSchema, EmployeeSchema } from '../../schema';
import employeesList from './get-employees-list-success.json';

type OxaEmployee = z.infer<typeof EmployeeSchema>;
type OxaCreateEmployee = z.infer<typeof CreateEmployeeSchema>;

const schemas = [
  {
    match: ({ name }: OxaCreateEmployee) => name === 'bad-request',
    getResponse: () => new HttpResponse('Bad Request', { status: 400 }),
  },
];

export const createEmployee = http.post<PathParams, OxaCreateEmployee>('/employees', async ({ request }) => {
  const body = await request.json();

  const schema = schemas.find(schema => schema.match(body));

  await delay();

  if (schema) {
    return schema.getResponse();
  }

  const newEmployee: OxaEmployee = {
    id: employeesList.length + 1,
    ...body,
    img: `https://i.pravatar.cc/150?img=${employeesList.length + 1}`,
  };

  employeesList.push(newEmployee);

  return HttpResponse.json(newEmployee, { status: 201 });
});
