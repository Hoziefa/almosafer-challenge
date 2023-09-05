import { ApiEndPoints, httpClient } from '@api/config';
import type { Language, RepositoryResponse, Result } from '@app-types';

const URL = ApiEndPoints.githubRepositories;

async function getRepos(queryParams: string) {
  return await httpClient.get<Result<RepositoryResponse>>(
    `${URL}?${queryParams}`,
  );
}

async function getForksPerRepo(url: string) {
  return await httpClient.get<RepositoryResponse[]>(`${url}?per_page=3`);
}

async function getLanguagesPerRepo(url: string) {
  return await httpClient.get<Language>(url);
}

export const ReposHandler = {
  list: {
    queryKey: 'get-repositories-list',
    request: getRepos,
  },
  forks: {
    queryKey: 'get-repo-forks-list',
    request: getForksPerRepo,
  },
  languages: {
    queryKey: 'get-repo-languages-list',
    request: getLanguagesPerRepo,
  },
};
