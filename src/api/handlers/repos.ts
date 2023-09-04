import { ApiEndPoints, httpClient } from '@api/config';
import type { Language, Result } from '@app-types';
import { RepositoryResponse } from '@app-types';

const URL = ApiEndPoints.githubRepositories;

async function getRepos(queryParams: string) {
  return await httpClient.get<Result<RepositoryResponse>>(
    `${URL}?${queryParams}`,
  );
}

async function getForksPerUser(url: string) {
  return await httpClient.get<RepositoryResponse[]>(`${url}?per_page=3`);
}

async function getLanguagesPerUser(url: string) {
  return await httpClient.get<Language>(url);
}

export const ReposHandler = {
  list: {
    queryKey: 'get-repositories-list',
    request: getRepos,
  },
  forks: {
    queryKey: 'get-forks-list',
    request: getForksPerUser,
  },
  languages: {
    queryKey: 'get-languages-list',
    request: getLanguagesPerUser,
  },
};
