import { makeAutoObservable } from 'mobx';

export type TypeFilter = 'users' | 'repositories';

const DEFAULT_VALUE = 'users';

export default class FiltersStore {
  public queryFilter = '';

  public typeFilter = DEFAULT_VALUE;

  public constructor() {
    makeAutoObservable(this);
  }

  public setQueryFilter = (queryFilter: string): void => {
    this.queryFilter = queryFilter ?? '';
  };

  public setTypeFilter = (typeFilter: TypeFilter): void => {
    this.typeFilter = typeFilter || DEFAULT_VALUE;
  };
}
