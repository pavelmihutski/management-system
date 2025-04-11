import { queryClient } from '../queryClient';
import { queryKeys } from './queries';
import { Employee } from './types';

export function createEmployee(employee: Employee) {
  queryClient.invalidateQueries({ queryKey: ['EMPLOYEES'] });

  return queryClient.setQueryData<Array<Employee>>(queryKeys.employees(), data => {
    if (!data) {
      return [employee];
    }

    return [...data, employee];
  });
}

export function updateEmployee(employee: Employee) {
  return queryClient.setQueryData<Array<Employee>>(queryKeys.employees(), data => {
    if (!data) {
      return;
    }

    return data.map(item => (item.id === employee.id ? employee : item));
  });
}
