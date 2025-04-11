import { delay, HttpResponse, PathParams } from 'msw';
import { http } from 'msw';
import { z } from 'zod';

import { EmployeeSchema } from '@/api/schema';

import employeesList from './get-employees-list-success.json';

type OxaEmployee = z.infer<typeof EmployeeSchema>;

const schemas = [
  {
    match: ({ name }: OxaEmployee) => name === 'bad-request',
    getResponse: () => new HttpResponse('Bad Request', { status: 400 }),
  },
  {
    match: ({ name }: OxaEmployee) => name === 'success',
    getResponse: () => HttpResponse.json(employeesList, { status: 200 }),
  },
];

export const updateEmployee = http.put<PathParams, OxaEmployee>('/employees/:id', async ({ request, params }) => {
  const { id } = params;
  const body = await request.json();

  const schema = schemas.find(schema => schema.match(body));

  await delay();

  if (schema) {
    return schema.getResponse();
  }

  const index = employeesList.findIndex(employee => employee.id === Number(id));

  const updatedEmployee = { ...employeesList[index], ...body };

  if (index !== -1) {
    employeesList[index] = updatedEmployee;
  }

  return HttpResponse.json(updatedEmployee, { status: 200 });
});
