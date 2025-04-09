import { getUsers } from '../../endpoints';
import { processUser } from './processing';

export const fetchUsers = async (search?: string) => {
  const response = await getUsers({ search });

  return response.map(processUser);
};
