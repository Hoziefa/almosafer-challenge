import { ApiEndPoints, httpClient } from '@api/config';
import type { Result, UserResponse } from '@app-types';

const URL = ApiEndPoints.githubUsers;

async function getUsers(queryParams: string) {
  return await httpClient.get<Result<UserResponse>>(`${URL}?${queryParams}`);
}

export const UsersHandler = {
  list: {
    queryKey: 'get-users-list',
    request: getUsers,
  },
};
