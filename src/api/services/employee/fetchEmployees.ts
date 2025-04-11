import { getEmployees } from '../../endpoints';
import { processEmployee } from './processing';

export const fetchEmployees = async (search?: string) => {
  const response = await getEmployees({ search });

  return response.map(processEmployee);
};
