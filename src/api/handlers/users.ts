import { ApiEndPoints, httpClient } from "@api/config";
import type { Result, User } from "@app-types";

const URL = ApiEndPoints.githubUsers;

export function usersDTO(data: Result<User>) {
  return {
    totalCount: data.total_count,
    users: data.items.map((user) => ({
      avatar: user.avatar_url,
      userName: user.login,
    })),
  };
}

export type UsersDTO = ReturnType<typeof usersDTO>;

async function getUsers(queryParams: string) {
  return await httpClient.get<Result<User>>(`${ URL }?${ queryParams }`);
}

export const UsersHandler = {
  list: {
    queryKey: "get-users-list",
    request: getUsers,
  },
};
