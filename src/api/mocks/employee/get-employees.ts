import { delay, PathParams } from 'msw';
import { http, HttpResponse } from 'msw';
import { z } from 'zod';

import { EmployeeSchema } from '../../schema';
import employeesList from './get-employees-list-success.json';

type OxaEmployee = z.infer<typeof EmployeeSchema>;

export const getEmployees = http.get<PathParams, OxaEmployee[]>('/employees', async ({ request }) => {
  const url = new URL(request.url);
  const searchQuery = url.searchParams.get('search')?.toLowerCase() ?? '';

  const filteredEmployees = employeesList.filter(employee => employee.name.toLowerCase().includes(searchQuery));

  await delay();

  return HttpResponse.json(filteredEmployees, { status: 200 });
});
