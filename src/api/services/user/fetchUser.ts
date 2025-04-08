import { getUsers } from '../../endpoints';
import { processUser } from './processing';

export const fetchUser = async () => {
  const response = await getUsers();

  return response.map(processUser);
};
