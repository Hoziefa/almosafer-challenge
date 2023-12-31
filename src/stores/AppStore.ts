import { makeAutoObservable } from 'mobx';

export default class AppStore {
  public showSnackbar = false;

  public duration?: number = 2000;

  public message = '';

  public constructor() {
    makeAutoObservable(this);
  }

  public onOpen = (message: string, duration?: number): void => {
    this.showSnackbar = true;
    this.message = message;
    this.duration ??= duration;
  };

  public onClose = (): void => {
    this.showSnackbar = false;
  };
}
