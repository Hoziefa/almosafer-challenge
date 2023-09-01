import { ApiEndPoints, httpClient } from "@api/config";
import type { Repository, Result } from "@app-types";

const URL = ApiEndPoints.githubRepositories;

async function getRepos(queryParams: string) {
  return await httpClient.get<Result<Repository>>(`${ URL }?${ queryParams }`);
}

async function getForksPerUser(url: string) {
  return await httpClient.get<Repository[]>(url);
}

export const ReposHandler = {
  list: {
    queryKey: "get-repositories-list",
    request: getRepos,
  },
  forks: {
    queryKey: "get-forks-list",
    request: getForksPerUser,
  },
};
