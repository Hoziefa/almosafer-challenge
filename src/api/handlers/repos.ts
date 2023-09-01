import { ApiEndPoints, httpClient } from "@api/config";
import type { Repository, Result } from "@app-types";

const URL = ApiEndPoints.githubRepositories;

async function getRepos(queryParams: string) {
  return await httpClient.get<Result<Repository>>(`${ URL }?${ queryParams }`);
}

export const ReposHandler = {
  list: {
    queryKey: "get-repositories-list",
    request: getRepos,
  },
};
